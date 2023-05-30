/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from "react";
import { Handle, useUpdateNodeInternals, Position } from "reactflow";
import { useDispatch } from "react-redux";
import { setOutgoersEnable } from "store/reducers/flow/flowElementsSlice";
import PropTypes from "prop-types";

import { Badge } from "reactstrap";
import { getIconComponent } from "components/FlowEditor/helpers/nodeObjectHelper";
import flowExecutorSocket from "services/flowExecutorService/flowExecutor.event";
import { setModal } from "store/reducers/componentSlice";
import NodeConfigMenu from "components/FlowEditor/components/Menu/NodeConfigMenu/NodeConfigMenu";
import * as Styled from "./Node.style";
import NodeHeader from "./NodeHeader/NodeHeader";

const propTypes = {
  self: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

const NodeGod = ({ self, children }) => {
  const { sourceCount, targetCount, ioType } = self.data.skeleton.ioEngine;
  const { enable, group } = self.data.ui;
  const { stateHandles } = self.data.skeleton;
  const updateNodeInternals = useUpdateNodeInternals();
  const sources = Array.from(Array(sourceCount).keys());
  const targets = Array.from(Array(targetCount).keys());
  const dispatch = useDispatch();
  const [serverData, setServerData] = useState("");

  useEffect(() => {
    updateNodeInternals(self.id);
  }, [targetCount, sourceCount]);

  const NodeIcon = getIconComponent(self.type);
  useEffect(() => {
    dispatch(setOutgoersEnable({ self, enable }));
  }, [enable]);

  useEffect(() => {
    flowExecutorSocket.sendMessage({
      message: `Hi! My type: ${self.type}`,
      id: self.id,
      type: self.type,
    });
    flowExecutorSocket.onNodeStatus(self, (data) => {
      console.log(`data from server for ${self.id}: `, data);
      setServerData(data);
    });
  }, []);

  const onDoubleClickHandle = () => {
    dispatch(setModal(<NodeConfigMenu self={self} />));
  };
  return (
    <Styled.NodeWrapper>
      <Styled.TargetHandleWrapper>
        <InputStateHandles stateHandles={stateHandles} />
        {targets.map((i, index) => (
          <Handle
            key={index}
            type="target"
            position={Position.Left}
            className="node-handle horizontal"
            id={`target${index + 1}`}
            style={{
              backgroundColor: group.color || "gray",
              visibility:
                ioType === "target" || ioType === "both" ? "visible" : "hidden",
            }}
          />
        ))}
      </Styled.TargetHandleWrapper>
      <Styled.NodeArea
        selected={self.selected}
        enable={enable}
        onDoubleClick={onDoubleClickHandle}
      >
        <NodeHeader self={self} />
        <Styled.NodeContent type="logo">
          <NodeIcon width="40px" height="40px" enable={enable} />
        </Styled.NodeContent>
        <Badge
          color="success"
          style={{ position: "absolute", bottom: "-15px" }}
        >
          {serverData.message}
        </Badge>
      </Styled.NodeArea>
      <Styled.SourceHandleWrapper>
        {stateHandles.outputs && (
          <OutputStateHandles stateHandles={stateHandles} />
        )}
        {sources.map((i, index) => (
          <Handle
            key={index}
            type="source"
            position={Position.Right}
            id={`source${index + 1}`}
            isValidConnection={(connection) =>
              !connection.targetHandle.includes("status_")
            }
            className="node-handle horizontal"
            style={{
              backgroundColor: group.color || "gray",
              visibility:
                ioType === "source" || ioType === "both" ? "visible" : "hidden",
            }}
          />
        ))}
      </Styled.SourceHandleWrapper>
    </Styled.NodeWrapper>
  );
};

export default React.memo(NodeGod);

NodeGod.propTypes = propTypes;

const InputStateHandles = ({ stateHandles }) => {
  const inputStates = Object.entries(stateHandles.inputs);
  return (
    <>
      {inputStates.map((inputState) => (
        <>
          {inputState[1] && (
            <div
              style={{
                display: "flex",
              }}
            >
              <div style={{ color: "gray" }}>{inputState[0]}</div>
              <Handle
                key={inputState[0]}
                id={`status_${inputState[0]}`}
                type="target"
                position={Position.Left}
                className="node-handle horizontal"
                style={{
                  backgroundColor: "green",
                }}
              />
            </div>
          )}
        </>
      ))}
    </>
  );
};

const OutputStateHandles = ({ stateHandles }) => {
  const outputStates = Object.entries(stateHandles.outputs);
  return (
    <>
      {outputStates.map((outputState) => (
        <>
          {outputState[1] && (
            <div style={{ display: "flex" }}>
              <Handle
                key={outputState[0]}
                id={`status_${outputState[0]}`}
                type="source"
                position={Position.Right}
                isValidConnection={(connection) =>
                  connection.targetHandle.includes("status_")
                }
                className="node-handle horizontal"
                style={{
                  backgroundColor: "green",
                }}
              />
              <div style={{ color: "gray" }}>{outputState[0]}</div>
            </div>
          )}
        </>
      ))}
    </>
  );
};
