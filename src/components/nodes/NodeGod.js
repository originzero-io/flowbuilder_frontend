import React, { useEffect, useState, useContext } from "react";
import { Handle, useUpdateNodeInternals } from "react-flow-renderer";
import CollapseButton from "../global/buttons/CollapseButton";
import { useSelector, useDispatch } from "react-redux";
import { InfoIcon } from "../global/SvgIcons";
import NodeHeader from "./global/NodeHeader";
import NodeLogo from "./global/NodeLogo";
import {
  NodeArea,
  NodeContent,
  NodeWrapper,
  SourceWrapper,
  TargetWrapper,
  Info,
} from "./styles";
const NodeGod = ({
  self,
  iconSrc,
  flagColor,
  align,
  setAlign,
  io,
  children,
  collapsable,
}) => {
  const updateNodeInternals = useUpdateNodeInternals();
  const sourceArray = [];
  const targetArray = [];
  const { alignAll } = useSelector((state) => state.guiConfigReducer);
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
  const [expand, setExpand] = useState(false);
  const expandMenu = () => {
    setExpand(!expand);
  };
  useEffect(() => {
    setExpand(self.data.expand);
  }, [self.data.expand]);
  useEffect(() => {
    setAlign(alignAll);
  }, [alignAll]);
  useEffect(() => {
    setAlign(self.data.align);
  }, [self.data.align]);
  const { selected } = self.data;
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
                borderColor: flagColor,
              }}
            />
          );
        })}
      </TargetWrapper>
      <NodeArea>
        <NodeHeader
          self={self}
          iconSrc={iconSrc}
          label={self.data.label}
          flagColor={self.data.group.color}
          align={align}
          setAlign={setAlign}
          collapsable={collapsable}
          expand={expand}
          expandMenu={expandMenu}
        />
        {expand === true ? (
          <NodeContent>{children}</NodeContent>
        ) : (
          <NodeContent type="logo">
            <NodeLogo src={iconSrc} />
          </NodeContent>
        )}
        <Info>
          <InfoIcon color={flagColor} draggable={false} />
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
                borderColor: flagColor,
              }}
            />
          );
        })}
      </SourceWrapper>
    </NodeWrapper>
  );
};

export default NodeGod;
