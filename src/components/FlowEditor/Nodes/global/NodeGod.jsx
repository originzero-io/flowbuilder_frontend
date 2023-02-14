import React, { useEffect } from "react";
import { Handle, useUpdateNodeInternals,Position } from "reactflow";
import { useSelector, useDispatch } from "react-redux";
import { InfoIcon } from "./Icons";
import NodeHeader from "./Header/index";
import {
  NodeArea,
  NodeContent,
  NodeWrapper,
  SourceWrapper,
  TargetWrapper,
  Info,
} from "../Nodes.style";
import getIconInstance from "./Icons/iconConstant";
import { setOutgoersEnable } from "store/reducers/flow/flowElementsSlice";
import PropTypes from "prop-types"
import useActiveFlow from "hooks/useActiveFlow";
import { flowExecutorNamespace } from "SocketConnections";
import { useState } from "react";
import { Badge } from "reactstrap";

const propTypes = {
  self: PropTypes.object.isRequired,
  ioType: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  collapsible: PropTypes.bool,
};

const NodeGod = ({ self, ioType, children, collapsible }) => {
  const updateNodeInternals = useUpdateNodeInternals();
  const sources = Array.from(Array(self.data.sourceCount).keys());
  const targets = Array.from(Array(self.data.targetCount).keys());
  const dispatch = useDispatch();
  const { align, expand, enable, group } = self.data;
  const [serverData, setServerData] = useState("");

  useEffect(() => {
    updateNodeInternals(self.id);
  }, [self.data.targetCount, self.data.sourceCount, align]);

  const NodeIcon = getIconInstance(self.type);
  useEffect(() => {
    dispatch(setOutgoersEnable({ self, enable }));
  }, [enable])

  useEffect(() => {
    console.log("self: ",self);
    flowExecutorNamespace.emit('nodeComm', { message: `Hi! My type: ${self.type}`, id: self.id, type: self.type })
    flowExecutorNamespace.on(self.id, (data) => {
      console.log(`data from server for ${self.id}: `, data);
      setServerData(data)
    })
  }, [])
  return (
    <>
    <NodeWrapper align={align} selected={self.selected} enable={enable}>
      <TargetWrapper align={align}>
        {targets.map((i, index) => {
          return (
            <Handle
              key={index}
              type="target"
              position={align === "vertical" ? Position.Top : Position.Left}
              id={`target${index + 1}`}
              className={`${
                align === "vertical"
                  ? "node-handle vertical"
                  : "node-handle horizontal"
              }`}
              style={{
                backgroundColor: group.color || "gray",
                visibility: ioType === "target" || ioType === "both" ? "visible" : "hidden"
              }}
            />
          );
        })}
      </TargetWrapper>

      <NodeArea>
        <NodeHeader
          self={self}
          collapsible={collapsible}
          selectedElements={self.selected}
        />
        {expand ? (
          <NodeContent>{children}</NodeContent>
        ) : (
          <NodeContent type="logo">
            <NodeIcon width="70px" height="70px" enable={enable} />
          </NodeContent>
        )}
        <Info>
          <InfoIcon color="whitesmoke" />
        </Info>
      </NodeArea>

      <SourceWrapper align={align}>
        {sources.map((i, index) => {
          return (
            <Handle
              key={index}
              type="source"
              position={align === "vertical" ? Position.Bottom : Position.Right}
              id={`source${index + 1}`}
              className={`${
                align === "vertical"
                  ? "node-handle vertical"
                  : "node-handle horizontal"
              }`}
              style={{
                backgroundColor: group.color || "gray",
                visibility: ioType === "source" || ioType === "both" ? "visible" : "hidden"
              }}
            />
          );
        })}
      </SourceWrapper>
    </NodeWrapper>
    <Badge color="success">{serverData.message}</Badge>
    </>
  );
};

export default React.memo(NodeGod);


NodeGod.propTypes = propTypes;