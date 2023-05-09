import React, { useEffect, useState } from "react";
import { Handle, useUpdateNodeInternals, Position } from "reactflow";
import { useSelector, useDispatch } from "react-redux";
import { setOutgoersEnable } from "store/reducers/flow/flowElementsSlice";
import PropTypes from "prop-types";
import useActiveFlow from "utils/hooks/useActiveFlow";
// import { flowExecutorNamespace } from "app/SocketConnections";

import { Badge } from "reactstrap";
import { getIconComponent } from "components/FlowEditor/helpers/nodeTypeHelper";
import flowExecutorSocket from "services/flowExecutorService/flowExecutor.socket";
import * as Styled from "./Node.style";
import NodeHeader from "./NodeHeader/NodeHeader";
import { InfoIcon } from "./NodeIcons";
import NodeIOManager from "./NodeIOManager";

const propTypes = {
  self: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  collapsible: PropTypes.bool,
};

const NodeGod = ({ self, children, collapsible }) => {
  const { sourceCount, targetCount, ioType } = self.data.engine;
  const updateNodeInternals = useUpdateNodeInternals();
  const sources = Array.from(Array(sourceCount).keys());
  const targets = Array.from(Array(targetCount).keys());
  const dispatch = useDispatch();
  const { align, expand, enable, group } = self.data;
  const [serverData, setServerData] = useState("");
  const [nodeInputs, setNodeInputs] = useState({
    state_trig: true,
    state_start: true,
    state_end: true,
    state_error: true,
    state_stop: false,
    clear: false,
    whatever: false,
  });
  useEffect(() => {
    updateNodeInternals(self.id);
  }, [targetCount, sourceCount, align]);

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
  return (
    <>
      <Styled.NodeWrapper
        align={align}
        selected={self.selected}
        enable={enable}
      >
        <Styled.TargetWrapper align={align}>
          <div style={{ display: "flex", position: "relative", right: "55px" }}>
            <div style={{ color: "gray" }}>state.stop</div>
            <Handle
              key="state.stop"
              type="target"
              position={align === "vertical" ? Position.Top : Position.Left}
              id="state.stop"
              className={`${
                align === "vertical"
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
          {nodeInputs.state_stop && (
            <>
              <div
                style={{ display: "flex", position: "relative", right: "66px" }}
              >
                <div style={{ color: "gray" }}>state.active</div>
                <Handle
                  key="state.active"
                  type="target"
                  position={align === "vertical" ? Position.Top : Position.Left}
                  id="state.active"
                  className={`${
                    align === "vertical"
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
                  right: "81px",
                }}
              >
                <div style={{ color: "gray" }}>state.deactive</div>
                <Handle
                  key="state.deactive"
                  type="target"
                  position={align === "vertical" ? Position.Top : Position.Left}
                  id="state.passive"
                  className={`${
                    align === "vertical"
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
          {nodeInputs.state_trig && (
            <div
              style={{ display: "flex", position: "relative", right: "50px" }}
            >
              <div style={{ color: "gray" }}>state.trig</div>
              <Handle
                key="state.trig"
                type="target"
                position={align === "vertical" ? Position.Top : Position.Left}
                id="state.trig"
                className={`${
                  align === "vertical"
                    ? "node-handle vertical"
                    : "node-handle horizontal"
                }`}
                style={{
                  backgroundColor: "orange",
                  visibility:
                    ioType === "source" || ioType === "both"
                      ? "visible"
                      : "hidden",
                }}
              />
            </div>
          )}
          {nodeInputs.clear && (
            <div
              style={{ display: "flex", position: "relative", right: "25px" }}
            >
              <div style={{ color: "gray" }}>clear</div>
              <Handle
                key="clear"
                type="target"
                position={align === "vertical" ? Position.Top : Position.Left}
                id="clear"
                className={`${
                  align === "vertical"
                    ? "node-handle vertical"
                    : "node-handle horizontal"
                }`}
                style={{
                  backgroundColor: "orange",
                  visibility:
                    ioType === "source" || ioType === "both"
                      ? "visible"
                      : "hidden",
                }}
              />
            </div>
          )}
          {targets.map((i, index) => (
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
                visibility:
                  ioType === "target" || ioType === "both"
                    ? "visible"
                    : "hidden",
              }}
            />
          ))}
        </Styled.TargetWrapper>

        <Styled.NodeArea>
          <NodeHeader self={self} collapsible={collapsible} />
          {expand ? (
            <Styled.NodeContent>
              {children}
              <NodeIOManager
                self={self}
                nodeInputs={nodeInputs}
                setNodeInputs={setNodeInputs}
              />
            </Styled.NodeContent>
          ) : (
            <Styled.NodeContent type="logo">
              <NodeIcon width="70px" height="70px" enable={enable} />
            </Styled.NodeContent>
          )}
        </Styled.NodeArea>
        <Styled.SourceWrapper align={align}>
          {nodeInputs.state_start && (
            <div style={{ display: "flex" }}>
              <Handle
                key="state_start"
                type="source"
                position={
                  align === "vertical" ? Position.Bottom : Position.Right
                }
                id="state_start"
                // isValidConnection={(connection) =>
                //   connection.targetHandle === "state.trig"
                // }
                className={`${
                  align === "vertical"
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
              <div style={{ color: "gray" }}>state.start</div>
            </div>
          )}
          {nodeInputs.state_end && (
            <div style={{ display: "flex" }}>
              <Handle
                key="state_end"
                type="source"
                position={
                  align === "vertical" ? Position.Bottom : Position.Right
                }
                id="state_end"
                // isValidConnection={(connection) =>
                //   connection.targetHandle === "state.trig"
                // }
                className={`${
                  align === "vertical"
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
              <div style={{ color: "gray" }}>state.end</div>
            </div>
          )}
          {nodeInputs.state_error && (
            <div style={{ display: "flex" }}>
              <Handle
                key="state_error"
                type="source"
                position={
                  align === "vertical" ? Position.Bottom : Position.Right
                }
                id="state_error"
                // isValidConnection={(connection) =>
                //   connection.targetHandle === "state.trig"
                // }
                className={`${
                  align === "vertical"
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
          )}
          {nodeInputs.whatever && (
            <div style={{ display: "flex" }}>
              <Handle
                key="whatever"
                type="source"
                position={
                  align === "vertical" ? Position.Bottom : Position.Right
                }
                id="whatever"
                // isValidConnection={(connection) =>
                //   connection.targetHandle === "state.trig"
                // }
                className={`${
                  align === "vertical"
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
              <div style={{ color: "gray" }}>whatever</div>
            </div>
          )}
          {sources.map((i, index) => (
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
