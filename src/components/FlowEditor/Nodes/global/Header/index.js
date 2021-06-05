import React, { useState, useEffect } from "react";
import Flag from "./NodeFlag";
import { Header, Label ,Content,FeatureIconsWrapper } from "../../styles";
import { useSelector, useDispatch } from "react-redux";
import GroupMenu from "../../../Menu/GroupMenu";
import { closeAllNodeGroupMenu } from "../../../../../store/actions/guiActions";
import { expandNode } from "../../../../../store/actions/elementsActions";
import EditNameForm from "./EditNameForm";
import FeatureIcons from "./FeatureIcons";
import PropTypes from "prop-types"
export default function NodeHeader({ self, selectedElements }) {
  const dispatch = useDispatch();
  //const elements = useSelector((state) => state.elementReducer).present;

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
NodeHeader.propTypes = {
  self: PropTypes.object.isRequired,
  selectedElements:PropTypes.array.isRequired
}