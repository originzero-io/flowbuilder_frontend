/* eslint-disable react/jsx-no-useless-fragment */
import { flowExecutorSocket } from "pages/FlowPage";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useUpdateNodeInternals } from "reactflow";
import { Badge } from "reactstrap";
import flowExecutorEvent from "services/flowExecutorService/flowExecutor.event";
import { setOutgoersEnable } from "store/reducers/flow/flowElementsSlice";
import { toggleNodeConfigurationMenu } from "store/reducers/menuSlice";
import styled from "styled-components";
import DynamicSVG from "components/Shared/DynamicSVG";
import InputParameterHandles from "./NodeHandles/InputParameterHandles";
import InputStatusHandles from "./NodeHandles/InputStatusHandles";
import NodeHeader from "./NodeHeader/NodeHeader";
import OutputStatusHandles from "./NodeHandles/OutputStatusHandles";
import OutputValueHandles from "./NodeHandles/OutputValueHandles";

const NodeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  color: ${(props) => (props.nodeType === "TRIGGER" ? "#65cd1a" : "#a6b3e8")};
`;
const NodeArea = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2px 2px;
  border-radius: 4px 4px 4px 4px;
  box-shadow: 0px 4px 4px #00000040;
  opacity: ${(props) => (props.enable ? "1" : "0.5")};
  position: relative;
  background: ${(props) =>
    props.selected
      ? props.nodeType === "TRIGGER"
        ? "rgba(67, 177, 4,0.3)"
        : "rgba(166, 179, 232,0.3)"
      : props.nodeType === "TRIGGER"
      ? "#2d2d2d"
      : "rgba(52, 55, 75, 1)"};
`;

const HandleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: ${(props) => (props.handleType === "source" ? "0px" : "-6px")};
  margin-left: ${(props) => (props.handleType === "source" ? "-6px" : "0px")};
  z-index: 1000;
  font-size: 10px;
  justify-content: center;
  align-items: ${(props) => (props.handleType === "source" ? "flex-start" : "flex-end")};
  padding-top: 28px;
`;

const NodeContent = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: ${(props) => (props.type === "logo" ? "1" : "none")};
`;

const propTypes = {
  self: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

const NodeGod = ({ self, children }) => {
  // const { sourceCount, targetCount } = self.data.ioEngine;
  const { enable } = self.data;
  const { trigHandles, statusHandles, inputParameters, outputValues } = self.data;
  const updateNodeInternals = useUpdateNodeInternals();
  const dispatch = useDispatch();
  const [serverData, setServerData] = useState("");
  const [handleColor, setHandleColor] = useState({
    string: "#00b4d8",
    int: "tomato",
    boolean: "orange",
    any: "gray",
  });

  useEffect(() => {
    updateNodeInternals(self.id);
  }, [self.data]);

  useEffect(() => {
    dispatch(setOutgoersEnable({ self, enable }));
  }, [enable]);

  useEffect(() => {
    flowExecutorEvent.injectSocket(flowExecutorSocket);

    flowExecutorEvent.onNodeStatus(self, (data) => {
      console.log(`data from server for ${self.id}: `, data);
      setServerData(data);
    });
    // if (flowExecutorSocket) {
    // }
  }, []);

  const onDoubleClickHandle = (e) => {
    e.stopPropagation();
    dispatch(toggleNodeConfigurationMenu({ element: self, state: true }));
  };

  const nodeSvg = self.data.ui.icon;

  return (
    <NodeWrapper nodeType={self.type}>
      <HandleWrapper handleType="target">
        <InputStatusHandles trigHandles={trigHandles} statusHandles={statusHandles} />
        {inputParameters && (
          <InputParameterHandles
            nodeId={self.id}
            inputParameters={inputParameters}
            handleColor={handleColor}
          />
        )}
      </HandleWrapper>
      <NodeArea nodeType={self.type} selected={self.selected} enable={enable}>
        <NodeHeader self={self} />
        <NodeContent type="logo" onDoubleClick={onDoubleClickHandle}>
          <DynamicSVG
            svgContent={nodeSvg}
            color={self.type === "TRIGGER" ? "#65CD1A" : "#A6B3E8"}
            size={40}
          />
          {children}
        </NodeContent>
        <Badge
          color={serverData.color}
          style={{
            background: serverData.color,
            position: "absolute",
            bottom: "-15px",
          }}
        >
          {serverData.message}
        </Badge>
      </NodeArea>
      <HandleWrapper handleType="source">
        {statusHandles?.outputs && (
          <OutputStatusHandles statusHandles={statusHandles} handleColor={handleColor} />
        )}
        {outputValues && (
          <OutputValueHandles outputValues={outputValues} handleColor={handleColor} />
        )}
      </HandleWrapper>
    </NodeWrapper>
  );
};

export default React.memo(NodeGod);

NodeGod.propTypes = propTypes;
