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
} from "../../global/SvgIcons";
export default function NewGroupForm({ theme }) {
  const [groupInfo, setGroupInfo] = useState({});
  const [formOpen, setFormOpen] = useState(false);
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
  return (
    <AddGroupWrapper onSubmit={addNewGroup}>
      <Header>
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
      </Header>

      {formOpen && (
        <InputWrapper>
          <Input
            placeholder="Add Group Name"
            required
            onChange={groupHandle}
            name="name"
            value={groupInfo.name}
            maxLength={14}
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
      <Divider></Divider>
    </AddGroupWrapper>
  );
}
