import React, { useState, useEffect, Component } from "react";
import Flag from "./NodeFlag";
import { Header, Label ,Content,FeatureIconsWrapper } from "../../styles";
import { useSelector, useDispatch } from "react-redux";
import RotateButton from "../../../global/buttons/RotateButton";
import GroupMenu from "../../../menus/group-menu";
import { closeAllNodeGroupMenu } from "../../../../REDUX/actions/guiActions";
import getIconComponent from "../icons/iconConstant";
import { expandNode, setElements } from "../../../../REDUX/actions/elementsActions";
import EditNameForm from "./EditNameForm";
import Switch from "react-switch"
import FeatureIcons from "./FeatureIcons";
export default function NodeHeader({ self, selectedElements }) {
  const dispatch = useDispatch();
  const elements = useSelector((state) => state.elementReducer).present;

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
  const [edit, setEdit] = useState(false);
  const expandHandle = () => {
    dispatch(expandNode(self));
  };

  return (
    <>
      <Header
        onMouseEnter={onMouseEnterHandle}
        onMouseLeave={onMouseLeaveHandle}
        selected={selectedElements}
      >
        {/* <NodeIcon/> */}
        <Content>
          {edit ? (
            <EditNameForm setEdit={setEdit} self={self} />
          ) : (
            <Label onDoubleClick={expandHandle}>{self.data.label}</Label>
          )}
        </Content>
        <FeatureIconsWrapper>
          {hover && (
            <FeatureIcons self={self} edit={edit} setEdit={setEdit}/>
          )}
        </FeatureIconsWrapper>
        <Flag self={self} onClick={groupHandle} />
        {showGroup && <GroupMenu self={self} />}
      </Header>
    </>
  );
}
