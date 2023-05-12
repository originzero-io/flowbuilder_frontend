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
    state_errorVal: true,
    state_enable: false,
    state_disable: false,
    state_cancel: true,
    state_clear: true,
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
          {(nodeInputs.state_enable || nodeInputs.state_disable) && (
            <>
              <div
                style={{ display: "flex", position: "relative", right: "71px" }}
              >
                <div style={{ color: "gray" }}>state.enable</div>
                <Handle
                  key="state_enable"
                  type="target"
                  position={align === "vertical" ? Position.Top : Position.Left}
                  id="state_enable"
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
                  right: "74px",
                }}
              >
                <div style={{ color: "gray" }}>state.disable</div>
                <Handle
                  key="state_disable"
                  type="target"
                  position={align === "vertical" ? Position.Top : Position.Left}
                  id="state_disable"
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
                key="state_trig"
                type="target"
                position={align === "vertical" ? Position.Top : Position.Left}
                id="state_trig"
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
          {nodeInputs.state_cancel && (
            <div
              style={{ display: "flex", position: "relative", right: "70px" }}
            >
              <div style={{ color: "gray" }}>state.cancel</div>
              <Handle
                key="state_cancel"
                type="target"
                position={align === "vertical" ? Position.Top : Position.Left}
                id="state_cancel"
                className={`${
                  align === "vertical"
                    ? "node-handle vertical"
                    : "node-handle horizontal"
                }`}
                style={{
                  backgroundColor: "#8ab7ff",
                  visibility:
                    ioType === "source" || ioType === "both"
                      ? "visible"
                      : "hidden",
                }}
              />
            </div>
          )}
          {nodeInputs.state_clear && (
            <div
              style={{ display: "flex", position: "relative", right: "60px" }}
            >
              <div style={{ color: "gray" }}>state.clear</div>
              <Handle
                key="state_clear"
                type="target"
                position={align === "vertical" ? Position.Top : Position.Left}
                id="state_clear"
                className={`${
                  align === "vertical"
                    ? "node-handle vertical"
                    : "node-handle horizontal"
                }`}
                style={{
                  backgroundColor: "#8ab7ff",
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
                isValidConnection={(connection) =>
                  Object.keys(nodeInputs).includes(connection.targetHandle)
                }
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
              isValidConnection={(connection) =>
                !Object.keys(nodeInputs).includes(connection.targetHandle)
              }
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
