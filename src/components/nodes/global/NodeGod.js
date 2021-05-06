import React, { useEffect, useState } from "react";
import { Handle, useUpdateNodeInternals } from "react-flow-renderer";
import { useSelector, useDispatch } from "react-redux";
import { InfoIcon } from "../../global/SvgIcons";
import NodeHeader from "./header/index";
import {
  NodeArea,
  NodeContent,
  NodeWrapper,
  SourceWrapper,
  TargetWrapper,
  Info,
} from "../styles";
import setIconInstance from "./iconConstant";
const NodeGod = ({ self, io, children, collapsable }) => {
  const updateNodeInternals = useUpdateNodeInternals();
  const sourceArray = [];
  const targetArray = [];
  const { zoom } = useSelector((state) => state.flowConfigReducer);
  const { selected, align, expand } = self.data;
  for (let index = 0; index < self.data.targetCount; index++) {
    if (io === "target" || io === "both") {
      targetArray.push(index);
    }
  }
  for (let index = 0; index < self.data.sourceCount; index++) {
    if (io === "source" || io === "both") {
      sourceArray.push(index);
    }
  }
  useEffect(() => {
    updateNodeInternals(self.id);
  }, [self.data.targetCount, self.data.sourceCount, align]);

  const NodeIcon = setIconInstance(self.type);

  return (
    <NodeWrapper align={align} selected={selected}>
      <TargetWrapper align={align}>
        {targetArray.map((i, index) => {
          return (
            <Handle
              key={index}
              type="target"
              position={align === "vertical" ? "top" : "left"}
              id={`target${index + 1}`}
              className={`${
                align === "vertical"
                  ? "node-handle vertical"
                  : "node-handle horizontal"
              }`}
              style={{
                backgroundColor: self.data.group.color,
              }}
            />
          );
        })}
      </TargetWrapper>

      <NodeArea>
        <NodeHeader
          self={self}
          collapsable={collapsable}
          selectedElements={selected}
        />
        {expand ? (
          <NodeContent>{children}</NodeContent>
        ) : (
          <NodeContent type="logo">
            <NodeIcon width="70px" height="70px" />
          </NodeContent>
        )}
        <Info>
          <InfoIcon color="whitesmoke" />
        </Info>
      </NodeArea>

      <SourceWrapper align={align}>
        {sourceArray.map((i, index) => {
          return (
            <Handle
              key={index}
              type="source"
              position={align === "vertical" ? "bottom" : "right"}
              id={`source${index + 1}`}
              className={`${
                align === "vertical"
                  ? "node-handle vertical"
                  : "node-handle horizontal"
              }`}
              style={{
                backgroundColor: self.data.group.color,
              }}
            />
          );
        })}
      </SourceWrapper>
    </NodeWrapper>
  );
};

export default NodeGod;
