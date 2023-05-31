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
  const { sourceCount, targetCount } = self.data.skeleton.ioEngine;
  const { enable, group } = self.data.ui;
  const { trigHandles, stateHandles, inputParameters, outputValues } =
    self.data.skeleton;
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
  }, [self.data.skeleton]);

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
        <InputStateHandles
          trigHandles={trigHandles}
          stateHandles={stateHandles}
        />
        {inputParameters && (
          <InputParameterHandles
            inputParameters={inputParameters}
            handleColor={handleColor}
          />
        )}
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
        {outputValues && (
          <OutputValueHandles
            outputValues={outputValues}
            handleColor={handleColor}
          />
        )}
      </Styled.SourceHandleWrapper>
    </Styled.NodeWrapper>
  );
};

export default React.memo(NodeGod);

NodeGod.propTypes = propTypes;

const InputStateHandles = ({ trigHandles, stateHandles }) => {
  // const trigHandl = Object.entries(stateHandles.inputs);
  const inputStates = Object.entries(stateHandles.inputs);
  return (
    <>
      {Object.entries(trigHandles).map((trigHandle) => {
        return (
          <>
            {trigHandle[1] && (
              <div
                style={{
                  display: "flex",
                }}
              >
                <div style={{ color: "gray" }}>{trigHandle[0]}</div>
                <Handle
                  key={trigHandle[0]}
                  id={`trig_${trigHandle[0]}`}
                  type="target"
                  position={Position.Left}
                  className="node-handle horizontal"
                  style={{ backgroundColor: "#40916c" }}
                />
              </div>
            )}
          </>
        );
      })}
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
                style={{ backgroundColor: "#40916c" }}
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

  const isValid = (connection) =>
    connection.targetHandle.split("_")[0] === "trig";
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
                isValidConnection={isValid}
                className="node-handle horizontal"
                style={{ backgroundColor: "#40916c" }}
              />
              <div style={{ color: "gray", marginLeft: "2px" }}>
                {outputState[0]}
              </div>
            </div>
          )}
        </>
      ))}
    </>
  );
};

const InputParameterHandles = ({ inputParameters, handleColor }) => {
  const parameters = Object.entries(inputParameters);
  return (
    <>
      {parameters.map((parameter) => {
        return (
          <div style={{ display: "flex" }}>
            <div style={{ color: "gray", marginLeft: "2px" }}>
              {parameter[0]}
            </div>
            <Handle
              key={parameter[0]}
              type="target"
              position={Position.Left}
              className="node-handle horizontal"
              id={`${parameter[1]}_${parameter[0]}`}
              style={{ backgroundColor: handleColor[parameter[1]] }}
            />
          </div>
        );
      })}
    </>
  );
};

const OutputValueHandles = ({ outputValues, handleColor }) => {
  const values = Object.entries(outputValues);

  const isValid = (connection) => {
    const sourceType = connection.sourceHandle.split("_")[0];
    const targetType = connection.targetHandle.split("_")[0];

    const isSameDataType =
      sourceType === targetType || sourceType === "any" || targetType === "any";

    const isNotTrigHandle = targetType !== "trig";
    return isSameDataType && isNotTrigHandle;
  };
  return (
    <>
      {values.map((value) => {
        return (
          <div style={{ display: "flex" }}>
            <Handle
              key={value[0]}
              type="source"
              position={Position.Right}
              id={`${value[1]}_${value[0]}`}
              isValidConnection={isValid}
              className="node-handle horizontal"
              style={{ backgroundColor: handleColor[value[1]] }}
            />
            <div style={{ color: "gray", marginLeft: "2px" }}>{value[0]}</div>
          </div>
        );
      })}
    </>
  );
};
