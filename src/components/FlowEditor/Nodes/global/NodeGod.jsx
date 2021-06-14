import React, { useEffect } from "react";
import { getOutgoers, Handle, useUpdateNodeInternals } from "react-flow-renderer";
import { useSelector, useDispatch } from "react-redux";
import { InfoIcon } from "./Icons";
import NodeHeader from "./Header/index";
import {
  NodeArea,
  NodeContent,
  NodeWrapper,
  SourceWrapper,
  TargetWrapper,
  Info,
} from "../styles";
import setIconInstance from "./Icons/iconConstant";
import { setOutgoersEnable } from "../../../../store/actions/elementsActions";
import PropTypes from "prop-types"
const NodeGod = ({ self, ioType, children, collapsible }) => {
  const updateNodeInternals = useUpdateNodeInternals();
  const sources = [];
  const targets = [];
  const { elementReducer } = useSelector((state) => state.activeFlowReducer);
  const elements = elementReducer.present;
  const dispatch = useDispatch();
  const { selected, align, expand, enable, group } = self.data;
  for (let index = 0; index < self.data.targetCount; index++) {
    targets.push(index);
  }
  for (let index = 0; index < self.data.sourceCount; index++) {
    sources.push(index);
  }
  useEffect(() => {
    updateNodeInternals(self.id);
  }, [self.data.targetCount, self.data.sourceCount, align]);

  const NodeIcon = setIconInstance(self.type);

  useEffect(() => {
    const outgoers = getOutgoers(self, elements);
    const outgoersIds = outgoers.map(o => o.id);
    dispatch(setOutgoersEnable(outgoersIds,enable));
  }, [enable])
  return (
    <NodeWrapper align={align} selected={selected} enable={enable}>
      <TargetWrapper align={align}>
        {targets.map((i, index) => {
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
                visibility: ioType === "target" || ioType === "both" ? "visible" : "hidden"
              }}
            />
          );
        })}
      </TargetWrapper>

      <NodeArea>
        <NodeHeader
          self={self}
          collapsible={collapsible}
          selectedElements={selected}
        />
        {expand ? (
          <NodeContent>{children}</NodeContent>
        ) : (
          <NodeContent type="logo">
            <NodeIcon width="70px" height="70px" enable={enable} />
          </NodeContent>
        )}
        <Info>
          <InfoIcon color="whitesmoke" />
        </Info>
      </NodeArea>

      <SourceWrapper align={align}>
        {sources.map((i, index) => {
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
                backgroundColor: group.color,
                visibility: ioType === "source" || ioType === "both" ? "visible" : "hidden"
              }}
            />
          );
        })}
      </SourceWrapper>
    </NodeWrapper>
  );
};

export default NodeGod;


NodeGod.propTypes = {
  self: PropTypes.object.isRequired,
  ioType: PropTypes.string.isRequired,
  children: PropTypes.element,
  collapsible: PropTypes.bool.isRequired,
}