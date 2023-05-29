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
  const { sourceCount, targetCount, ioType, stateful } =
    self.data.skeleton.ioEngine;
  const { direction, expand, enable, group } = self.data.ui;
  const { handleMechanism } = self.data.handles;
  const updateNodeInternals = useUpdateNodeInternals();
  const sources = Array.from(Array(sourceCount).keys());
  const targets = Array.from(Array(targetCount).keys());
  const dispatch = useDispatch();
  const [serverData, setServerData] = useState("");

  useEffect(() => {
    updateNodeInternals(self.id);
  }, [targetCount, sourceCount, direction]);

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
    <>
      <Styled.NodeWrapper
        direction={direction}
        selected={self.selected}
        enable={enable}
        onDoubleClick={onDoubleClickHandle}
      >
        <Styled.TargetWrapper direction={direction}>
          {stateful && (
            <InputStateHandles
              handleMechanism={handleMechanism}
              ioType={ioType}
              direction={direction}
            />
          )}
          {targets.map((i, index) => (
            <Handle
              key={index}
              type="target"
              position={direction === "vertical" ? Position.Top : Position.Left}
              id={`target${index + 1}`}
              className={`${
                direction === "vertical"
                  ? "node-handle vertical"
                  : "node-handle horizontal"
              }`}
              style={{
                backgroundColor: group.color || "gray",
                visibility:
                  ioType === "target" || ioType === "both"
                    ? "visible"
                    : "hidden",
              }}
            />
          ))}
        </Styled.TargetWrapper>

        <Styled.NodeArea>
          <NodeHeader self={self} />
          <Styled.NodeContent type="logo">
            <NodeIcon width="40px" height="40px" enable={enable} />
          </Styled.NodeContent>
        </Styled.NodeArea>
        <Styled.SourceWrapper direction={direction}>
          {stateful && (
            <OutputStateHandles
              handleMechanism={handleMechanism}
              direction={direction}
              ioType={ioType}
            />
          )}
          {sources.map((i, index) => (
            <Handle
              key={index}
              type="source"
              position={
                direction === "vertical" ? Position.Bottom : Position.Right
              }
              id={`source${index + 1}`}
              isValidConnection={(connection) =>
                !Object.keys(handleMechanism.stateHandles).includes(
                  connection.targetHandle,
                )
              }
              className={`${
                direction === "vertical"
                  ? "node-handle vertical"
                  : "node-handle horizontal"
              }`}
              style={{
                backgroundColor: group.color || "gray",
                visibility:
                  ioType === "source" || ioType === "both"
                    ? "visible"
                    : "hidden",
              }}
            />
          ))}
        </Styled.SourceWrapper>
      </Styled.NodeWrapper>
      <Badge color="success">{serverData.message}</Badge>
    </>
  );
};

export default React.memo(NodeGod);

NodeGod.propTypes = propTypes;

const InputStateHandles = ({ handleMechanism, ioType, direction }) => {
  const { stateHandles } = handleMechanism;
  return (
    <>
      {(stateHandles.enable || stateHandles.disable) && (
        <>
          <div style={{ display: "flex", position: "relative", right: "61px" }}>
            <div style={{ color: "gray" }}>state.enable</div>
            <Handle
              key="enable"
              type="target"
              position={direction === "vertical" ? Position.Top : Position.Left}
              id="enable"
              className={`${
                direction === "vertical"
                  ? "node-handle vertical"
                  : "node-handle horizontal"
              }`}
              style={{
                backgroundColor: "red",
                visibility:
                  ioType === "source" || ioType === "both"
                    ? "visible"
                    : "hidden",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              position: "relative",
              right: "63px",
            }}
          >
            <div style={{ color: "gray" }}>state.disable</div>
            <Handle
              key="disable"
              type="target"
              position={direction === "vertical" ? Position.Top : Position.Left}
              id="disable"
              className={`${
                direction === "vertical"
                  ? "node-handle vertical"
                  : "node-handle horizontal"
              }`}
              style={{
                backgroundColor: "red",
                visibility:
                  ioType === "source" || ioType === "both"
                    ? "visible"
                    : "hidden",
              }}
            />
          </div>
        </>
      )}
      {stateHandles.trig && (
        <div style={{ display: "flex", position: "relative", right: "42px" }}>
          <div style={{ color: "gray" }}>state.trig</div>
          <Handle
            key="trig"
            type="target"
            position={direction === "vertical" ? Position.Top : Position.Left}
            id="trig"
            className={`${
              direction === "vertical"
                ? "node-handle vertical"
                : "node-handle horizontal"
            }`}
            style={{
              backgroundColor: "orange",
              visibility:
                ioType === "source" || ioType === "both" ? "visible" : "hidden",
            }}
          />
        </div>
      )}
      {stateHandles.cancel && (
        <div style={{ display: "flex", position: "relative", right: "59px" }}>
          <div style={{ color: "gray" }}>state.cancel</div>
          <Handle
            key="cancel"
            type="target"
            position={direction === "vertical" ? Position.Top : Position.Left}
            id="cancel"
            className={`${
              direction === "vertical"
                ? "node-handle vertical"
                : "node-handle horizontal"
            }`}
            style={{
              backgroundColor: "#8ab7ff",
              visibility:
                ioType === "source" || ioType === "both" ? "visible" : "hidden",
            }}
          />
        </div>
      )}
      {stateHandles.clear && (
        <div style={{ display: "flex", position: "relative", right: "51px" }}>
          <div style={{ color: "gray" }}>state.clear</div>
          <Handle
            key="clear"
            type="target"
            position={direction === "vertical" ? Position.Top : Position.Left}
            id="clear"
            className={`${
              direction === "vertical"
                ? "node-handle vertical"
                : "node-handle horizontal"
            }`}
            style={{
              backgroundColor: "#8ab7ff",
              visibility:
                ioType === "source" || ioType === "both" ? "visible" : "hidden",
            }}
          />
        </div>
      )}
    </>
  );
};

const OutputStateHandles = ({ handleMechanism, ioType, direction }) => {
  const { stateHandles } = handleMechanism;
  return (
    <>
      {stateHandles.start && (
        <div style={{ display: "flex" }}>
          <Handle
            key="start"
            type="source"
            position={
              direction === "vertical" ? Position.Bottom : Position.Right
            }
            id="start"
            isValidConnection={(connection) =>
              Object.keys(stateHandles).includes(connection.targetHandle)
            }
            className={`${
              direction === "vertical"
                ? "node-handle vertical"
                : "node-handle horizontal"
            }`}
            style={{
              backgroundColor: "green",
              visibility:
                ioType === "source" || ioType === "both" ? "visible" : "hidden",
            }}
          />
          <div style={{ color: "gray" }}>state.start</div>
        </div>
      )}
      {stateHandles.end && (
        <div style={{ display: "flex" }}>
          <Handle
            key="end"
            type="source"
            position={
              direction === "vertical" ? Position.Bottom : Position.Right
            }
            id="end"
            isValidConnection={(connection) =>
              Object.keys(stateHandles).includes(connection.targetHandle)
            }
            className={`${
              direction === "vertical"
                ? "node-handle vertical"
                : "node-handle horizontal"
            }`}
            style={{
              backgroundColor: "green",
              visibility:
                ioType === "source" || ioType === "both" ? "visible" : "hidden",
            }}
          />
          <div style={{ color: "gray" }}>state.end</div>
        </div>
      )}
      {stateHandles.error && (
        <>
          <div style={{ display: "flex" }}>
            <Handle
              key="error"
              type="source"
              position={
                direction === "vertical" ? Position.Bottom : Position.Right
              }
              id="error"
              isValidConnection={(connection) =>
                Object.keys(stateHandles).includes(connection.targetHandle)
              }
              className={`${
                direction === "vertical"
                  ? "node-handle vertical"
                  : "node-handle horizontal"
              }`}
              style={{
                backgroundColor: "green",
                visibility:
                  ioType === "source" || ioType === "both"
                    ? "visible"
                    : "hidden",
              }}
            />
            <div style={{ color: "gray" }}>state.error</div>
          </div>
          <div style={{ display: "flex" }}>
            <Handle
              key="errorVal"
              type="source"
              position={
                direction === "vertical" ? Position.Bottom : Position.Right
              }
              id="errorVal"
              isValidConnection={(connection) =>
                !Object.keys(stateHandles).includes(connection.targetHandle)
              }
              className={`${
                direction === "vertical"
                  ? "node-handle vertical"
                  : "node-handle horizontal"
              }`}
              style={{
                backgroundColor: "gray",
                visibility:
                  ioType === "source" || ioType === "both"
                    ? "visible"
                    : "hidden",
              }}
            />
            <div style={{ color: "gray" }}>errorVal</div>
          </div>
        </>
      )}
    </>
  );
};
