import React, { useState, useEffect, Component } from "react";
import Flag from "./NodeFlag";
import { Header, Label, FeatureIcons } from "../../styles";
import { useSelector, useDispatch } from "react-redux";
import RotateButton from "../../../global/buttons/RotateButton";
import GroupMenu from "../../../menus/group-menu";
import { closeAllNodeGroupMenu } from "../../../../REDUX/actions/guiActions";
import { NameEditIcon } from "../../../global/SvgIcons";
import getIconComponent from "../iconConstant";
export default function NodeHeader({
  self,
  align,
  setAlign,
  selectedElements,
  onDoubleClick,
}) {
  const dispatch = useDispatch();
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

  const NodeIcon = getIconComponent(self.type);

  return (
    <>
      <Header
        onMouseEnter={onMouseEnterHandle}
        onMouseLeave={onMouseLeaveHandle}
        selected={selectedElements}
        onDoubleClick={onDoubleClick}
      >
        {/* <NodeIcon/> */}
        <Label>{self.data.label}</Label>
        <FeatureIcons>
          {hover && (
            <>
              <NameEditIcon theme="dark" />
              <RotateButton align={align} setAlign={setAlign} />
            </>
          )}
        </FeatureIcons>
        <Flag self={self} onClick={groupHandle}/>
        {showGroup && <GroupMenu self={self} />}
      </Header>
    </>
  );
}
