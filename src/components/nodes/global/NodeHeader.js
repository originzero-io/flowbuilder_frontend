import React, { useState,useEffect } from "react";
import Icon from "./NodeIcon";
//import CollapseButton from "../global/CollapseButton";
import Flag from "../../global/flag";
import { Header, Label, Divider } from "../styles";
import { useSelector, useDispatch } from "react-redux";
import { setGroupMenu } from "../../../REDUX/actions/menuActions";
import RotateButton from "../../global/buttons/RotateButton";
import CollapseButton from "../../global/buttons/CollapseButton";
import GroupMenu from "../../menus/group-menu";
export default function NodeHeader({
  self,
  iconSrc,
  align,
  setAlign,
  collapsable,
  expand,
  expandMenu,
}) {
  const dispatch = useDispatch();
  const [showGroup, setShowGroup] = useState(false);
  const {closeAllGroupMenu} = useSelector(state=>state.guiConfigReducer)
  const groupHandle = (e) => {
    setShowGroup(!showGroup);
  };
  return (
    <div>
      <Header>
        <Icon src={iconSrc} />
        <Label>{self.data.label}</Label>
        {collapsable && (
          <CollapseButton expandMenu={expandMenu} expand={expand} />
        )}
        <RotateButton align={align} setAlign={setAlign} />
        <Flag flagColor={self.data.group.color} onClick={groupHandle}/>
        {showGroup && (
          <GroupMenu self={self}/>
        )}
      </Header>
      <Divider />
    </div>
  );
}
