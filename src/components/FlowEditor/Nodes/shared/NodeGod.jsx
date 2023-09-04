/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from "react";
import { Handle, useUpdateNodeInternals, Position } from "reactflow";
import { useDispatch } from "react-redux";
import { setOutgoersEnable } from "store/reducers/flow/flowElementsSlice";
import PropTypes from "prop-types";
import { Badge } from "reactstrap";
import { getIconComponent } from "components/FlowEditor/helpers/nodeObjectHelper";
import { setModal } from "store/reducers/componentSlice";
import NodeConfigMenu from "components/FlowEditor/components/Menu/NodeConfigMenu/NodeConfigMenu";
import { flowExecutorSocket } from "pages/FlowPage";
import flowExecutorEvent from "services/flowExecutorService/flowExecutor.event";
import * as Styled from "./Node.style";
import NodeHeader from "./NodeHeader/NodeHeader";

const propTypes = {
  self: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

const NodeGod = ({ self, children }) => {
  // const { sourceCount, targetCount } = self.data.ioEngine;
  const { enable, group } = self.data.ui;
  const { trigHandles, statusHandles, inputParameters, outputValues } =
    self.data;
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

  const NodeIcon = getIconComponent(self.type);
  useEffect(() => {
    dispatch(setOutgoersEnable({ self, enable }));
  }, [enable]);

  useEffect(() => {
    flowExecutorEvent.injectSocket(flowExecutorSocket);
    console.log(flowExecutorSocket);
    console.log(self);

    flowExecutorEvent.onNodeStatus(self, (data) => {
      console.log(`data from server for ${self.id}: `, data);
      setServerData(data);
    });
    if (flowExecutorSocket) {
    }
  }, []);

  const onDoubleClickHandle = () => {
    dispatch(setModal(<NodeConfigMenu self={self} />));
  };
  return (
    <Styled.NodeWrapper>
      <Styled.TargetHandleWrapper>
        <InputStatusHandles
          trigHandles={trigHandles}
          statusHandles={statusHandles}
        />
        {inputParameters && (
          <InputParameterHandles
            inputParameters={inputParameters}
            handleColor={handleColor}
          />
        )}
      </Styled.TargetHandleWrapper>
      <Styled.NodeArea selected={self.selected} enable={enable}>
        <NodeHeader self={self} onDoubleClick={onDoubleClickHandle} />
        <Styled.NodeContent type="logo">
          <NodeIcon width="40px" height="40px" enable={enable} />
          {children}
        </Styled.NodeContent>
        <Badge color="danger" style={{ position: "absolute", bottom: "-15px" }}>
          {serverData}
        </Badge>
      </Styled.NodeArea>
      <Styled.SourceHandleWrapper>
        {statusHandles?.outputs && (
          <OutputStatusHandles
            statusHandles={statusHandles}
            handleColor={handleColor}
          />
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

const InputStatusHandles = ({ trigHandles, statusHandles }) => {
  const inputStatusHandles = Object.entries(statusHandles.inputs);
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
      {inputStatusHandles.map((inputStatusHandle) => (
        <>
          {inputStatusHandle[1] && (
            <div
              style={{
                display: "flex",
              }}
            >
              <div style={{ color: "gray" }}>{inputStatusHandle[0]}</div>
              <Handle
                key={inputStatusHandle[0]}
                id={`status_${inputStatusHandle[0]}`}
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

const OutputStatusHandles = ({ statusHandles, handleColor }) => {
  const outputStatusHandles = Object.entries(statusHandles.outputs);

  const isValid = (connection) => {
    const [targetType] = connection.targetHandle.split("_");
    const [sourceType, sourceName] = connection.sourceHandle.split("_");
    const isStatusConnection =
      (sourceType === "trig" || sourceType === "status") &&
      (targetType === "trig" || targetType === "status");

    const isErrorValConnection =
      sourceName === "errorVal" && targetType !== "trig";
    return isStatusConnection || isErrorValConnection;
  };

  return (
    <>
      {outputStatusHandles.map((outputStatusHandle) => (
        <>
          {outputStatusHandle[1] && (
            <div style={{ display: "flex" }}>
              <Handle
                key={outputStatusHandle[0]}
                id={
                  outputStatusHandle[0] === "errorVal"
                    ? "string_errorVal"
                    : `status_${outputStatusHandle[0]}`
                }
                type="source"
                position={Position.Right}
                isValidConnection={isValid}
                className="node-handle horizontal"
                style={{
                  backgroundColor:
                    outputStatusHandle[0] === "errorVal"
                      ? handleColor.string
                      : "#40916c",
                }}
              />
              <div style={{ color: "gray", marginLeft: "2px" }}>
                {outputStatusHandle[0]}
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

    const isNotStatusHandle = targetType !== "trig" && targetType !== "status";

    return isSameDataType && isNotStatusHandle;
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
