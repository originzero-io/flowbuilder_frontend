import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";
import * as themeColor from "../../../config/ThemeReference";
import { addGroup } from "../../../REDUX/actions/nodeGroupsActions";
import {
  AddGroupWrapper,
  ColorInput,
  InputWrapper,
  Input,
  Title,
  IconWrapper,
  Submit,
  Divider,
  Header,
} from "./style";
import {
  SubmitIcon,
  AddIcon,
  CancelIcon,
  NonGroupIcon,
} from "../../global/SvgIcons";
import { useStoreActions, isNode } from "react-flow-renderer";

export default function NewGroupForm({ theme }) {
  const [groupInfo, setGroupInfo] = useState({});
  const [formOpen, setFormOpen] = useState(false);
  const elements = useSelector((state) => state.elementReducer);
  const setSelectedElements = useStoreActions(
    (actions) => actions.setSelectedElements
  );
  const dispatch = useDispatch();
  const groupHandle = (event) => {
    const { name, value } = event.target;
    setGroupInfo({
      ...groupInfo,
      [name]: value,
    });
  };
  const addNewGroup = (event) => {
    event.preventDefault();
    dispatch(
      addGroup({
        id: uuid(),
        nodes: [],
        name: groupInfo.name,
        color: groupInfo.color,
      })
    );
  };
  const selectNonGroupsHandle = () => {
    console.log("fkjsdhfjsd")
    const nonGroups = elements.filter(
      (els) => isNode(els) && els.data.group.id === undefined
    );
    setSelectedElements(nonGroups);
  };
  return (
    <AddGroupWrapper onSubmit={addNewGroup}>
      <Header theme={theme}>
        <IconWrapper onClick={() => setFormOpen(!formOpen)}>
          {formOpen === true ? (
            <CancelIcon
              width={"25px"}
              height={"25px"}
              color={
                theme === "dark" ? themeColor.DARK_ICON : themeColor.LIGHT_ICON
              }
            />
          ) : (
            <AddIcon
              width={"25px"}
              height={"25px"}
              color={
                theme === "dark" ? themeColor.DARK_ICON : themeColor.LIGHT_ICON
              }
            />
          )}
        </IconWrapper>
        <Title>Groups</Title>
        <NonGroupIcon width="40px" height="40px" onClick={selectNonGroupsHandle} theme={theme}/>
      </Header>

      {formOpen && (
        <InputWrapper>
          <Input
            theme={theme}
            placeholder="Add Group Name"
            required
            onChange={groupHandle}
            name="name"
            value={groupInfo.name}
            maxLength={18}
          />
          <ColorInput
            type="color"
            onChange={groupHandle}
            name="color"
            inForm={true}
            defaultValue="#2ecc71"
            value={groupInfo.color}
          />
          <Submit type="submit">
            <SubmitIcon
              width={"22px"}
              height={"22px"}
              color={
                theme === "dark" ? themeColor.DARK_ICON : themeColor.LIGHT_ICON
              }
            />
          </Submit>
        </InputWrapper>
      )}
      <Divider/>
    </AddGroupWrapper>
  );
}
