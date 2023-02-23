import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { expandNode } from "store/reducers/flow/flowElementsSlice";
import { closeAllNodeGroupMenu } from "store/reducers/flow/flowGuiSlice";
import useActiveFlow from "utils/hooks/useActiveFlow";
import { getIncomers, getOutgoers } from "reactflow";
import GroupMenu from "../../../components/Menu/NodeGroupMenu/NodeGroupMenu";
import * as Styled from "../Node.style";
import EditNameForm from "./EditNameForm";
import FeatureIcons from "./FeatureIcons";
import Flag from "./NodeFlag";

const propTypes = {
  self: PropTypes.object.isRequired,
  selectedElements: PropTypes.bool,
};
export default function NodeHeader({ self }) {
  const dispatch = useDispatch();
  const { flowGui, flowElements } = useActiveFlow();
  const { nodeGroupMenuDisplay } = flowGui;
  const [showGroup, setShowGroup] = useState(nodeGroupMenuDisplay);
  const [hover, setHover] = useState(false);
  const groupHandle = (e) => {
    setShowGroup(!showGroup);
    dispatch(closeAllNodeGroupMenu(false));
  };
  useEffect(() => {
    if (nodeGroupMenuDisplay) {
      setShowGroup(!nodeGroupMenuDisplay);
    }
  }, [nodeGroupMenuDisplay]);
  const onMouseEnterHandle = () => {
    setHover(true);
  };
  const onMouseLeaveHandle = () => {
    setHover(false);
  };

  // const NodeIcon = getIconComponent(self.type);
  const [edit, setEdit] = useState(false);
  const expandHandle = () => {
    dispatch(expandNode(self));
  };
  const nodeIncomers = () => {
    const incomers = getIncomers(self, flowElements.nodes, flowElements.edges);
    console.log("incomers: ", incomers);
  };
  const nodeOutgoers = () => {
    const outgoers = getOutgoers(self, flowElements.nodes, flowElements.edges);
    console.log("outgoers: ", outgoers);
  };

  return (
    <Styled.Header
      onMouseEnter={onMouseEnterHandle}
      onMouseLeave={onMouseLeaveHandle}
    >
      {/* <button onClick={nodeIncomers}>incomers</button>
        <button onClick={nodeOutgoers}>outgoers</button> */}
      {/* <NodeIcon/> */}
      <Styled.Content>
        {edit ? (
          <EditNameForm setEdit={setEdit} self={self} />
        ) : (
          <Styled.Label onDoubleClick={expandHandle}>
            {self.data.label}
          </Styled.Label>
        )}
      </Styled.Content>
      <Styled.FeatureIconsWrapper>
        {hover && <FeatureIcons self={self} edit={edit} setEdit={setEdit} />}
      </Styled.FeatureIconsWrapper>
      <Flag self={self} onClick={groupHandle} />
      {showGroup && <GroupMenu self={self} />}
    </Styled.Header>
  );
}
NodeHeader.propTypes = propTypes;
