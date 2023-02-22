import React, { useEffect, useState } from "react";
import { Handle, useUpdateNodeInternals, Position } from "reactflow";
import { useSelector, useDispatch } from "react-redux";
import { setOutgoersEnable } from "store/reducers/flow/flowElementsSlice";
import PropTypes from "prop-types";
import useActiveFlow from "utils/hooks/useActiveFlow";
import { flowExecutorNamespace } from "app/SocketConnections";

import { Badge } from "reactstrap";
import { getIconComponent } from "components/FlowEditor/helpers/nodeTypeHelper";
import {
  NodeArea,
  NodeContent,
  NodeWrapper,
  SourceWrapper,
  TargetWrapper,
  Info,
} from "./Node.style";
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

  useEffect(() => {
    updateNodeInternals(self.id);
  }, [targetCount, sourceCount, align]);

  const NodeIcon = getIconComponent(self.type);
  useEffect(() => {
    dispatch(setOutgoersEnable({ self, enable }));
  }, [enable]);

  useEffect(() => {
    flowExecutorNamespace.emit("nodeComm", {
      message: `Hi! My type: ${self.type}`,
      id: self.id,
      type: self.type,
    });
    flowExecutorNamespace.on(self.id, (data) => {
      console.log(`data from server for ${self.id}: `, data);
      setServerData(data);
    });
  }, []);
  return (
    <>
      <NodeWrapper align={align} selected={self.selected} enable={enable}>
        <TargetWrapper align={align}>
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
        </TargetWrapper>

        <NodeArea>
          <NodeHeader self={self} collapsible={collapsible} />
          {expand ? (
            <NodeContent>
              {children}
              <NodeIOManager self={self} />
            </NodeContent>
          ) : (
            <NodeContent type="logo">
              <NodeIcon width="70px" height="70px" enable={enable} />
            </NodeContent>
          )}
        </NodeArea>

        <SourceWrapper align={align}>
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
        </SourceWrapper>
      </NodeWrapper>
      <Badge color="success">{serverData.message}</Badge>
    </>
  );
};

export default React.memo(NodeGod);

NodeGod.propTypes = propTypes;
