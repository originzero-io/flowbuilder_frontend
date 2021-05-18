import React, { useEffect, useState } from "react";
import { getOutgoers, Handle, useUpdateNodeInternals } from "react-flow-renderer";
import { useSelector, useDispatch } from "react-redux";
import { InfoIcon } from "./icons";
import NodeHeader from "./header/index";
import {
  NodeArea,
  NodeContent,
  NodeWrapper,
  SourceWrapper,
  TargetWrapper,
  Info,
} from "../styles";
import setIconInstance from "./icons/iconConstant";
import { setOutgoersEnable } from "../../../REDUX/actions/flowActions";
const NodeGod = ({ self, ioType, children, collapsable }) => {
  const updateNodeInternals = useUpdateNodeInternals();
  const sourceArray = [];
  const targetArray = [];
  const { zoom } = useSelector((state) => state.flowConfigReducer);
  const elements = useSelector((state) => state.elementReducer);
  const dispatch = useDispatch();
  const { selected, align, expand } = self.data;
  for (let index = 0; index < self.data.targetCount; index++) {
    if (ioType === "target" || ioType === "both") {
      targetArray.push(index);
    }
  }
  for (let index = 0; index < self.data.sourceCount; index++) {
    if (ioType === "source" || ioType === "both") {
      sourceArray.push(index);
    }
  }
  useEffect(() => {
    updateNodeInternals(self.id);
  }, [self.data.targetCount, self.data.sourceCount, align]);

  const NodeIcon = setIconInstance(self.type);
  const { enable } = self.data;


  useEffect(() => {
    const outgoers = getOutgoers(self, elements);
    const outgoersIds = outgoers.map(o => o.id);
    dispatch(setOutgoersEnable(outgoersIds,self.data.enable));
  }, [self.data.enable])
  return (
    <NodeWrapper align={align} selected={selected} enable={enable}>
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
            <NodeIcon width="70px" height="70px" enable={self.data.enable} />
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
