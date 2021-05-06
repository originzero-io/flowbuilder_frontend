import React, { useState, useEffect, Component } from "react";
import Flag from "./NodeFlag";
import { Header, Label, FeatureIcons } from "../../styles";
import { useSelector, useDispatch } from "react-redux";
import RotateButton from "../../../global/buttons/RotateButton";
import GroupMenu from "../../../menus/group-menu";
import { closeAllNodeGroupMenu } from "../../../../REDUX/actions/guiActions";
import { NameEditIcon } from "../../../global/SvgIcons";
import getIconComponent from "../iconConstant";
import { expandNode, setElements } from "../../../../REDUX/actions/flowActions";
export default function NodeHeader({ self, selectedElements }) {
  const dispatch = useDispatch();
  const elements = useSelector((state) => state.elementReducer);

  const [showGroup, setShowGroup] = useState(false);
  const [hover, setHover] = useState(false);
  const { nodeGroupMenuDisplay } = useSelector(
    (state) => state.guiConfigReducer
  );
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

  //const NodeIcon = getIconComponent(self.type);
  const expandHandle = () => {
    dispatch(expandNode(self));
  };
  return (
    <>
      <Header
        onMouseEnter={onMouseEnterHandle}
        onMouseLeave={onMouseLeaveHandle}
        selected={selectedElements}
        onDoubleClick={expandHandle}
      >
        {/* <NodeIcon/> */}
        <Label>{self.data.label}</Label>
        <FeatureIcons>
          {hover && (
            <>
              <NameEditIcon theme="dark" />
              <RotateButton self={self} />
            </>
          )}
        </FeatureIcons>
        <Flag self={self} onClick={groupHandle} />
        {showGroup && <GroupMenu self={self} />}
      </Header>
    </>
  );
}
