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
} from "../../global/icons/index";
import { useStoreActions, isNode, isEdge } from "react-flow-renderer";
import { HorizontalDivider } from "../../style-components/Divider";
import { setElements } from "../../../REDUX/actions/elementsActions";

export default function NewGroupForm({ theme }) {
  const [groupInfo, setGroupInfo] = useState({});
  const [formOpen, setFormOpen] = useState(false);
  const elements = useSelector((state) => state.elementReducer).present;
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
    const nonGroups = elements.filter(
      (els) => isNode(els) && els.data.group.id === undefined
    );
    setSelectedElements(nonGroups);
  };
  const strokeWidthChange = (e) => {
    const newElements = elements.map(els => {
      if (isEdge(els)) {
        return {
          ...els,
          style: {
            ...els.style,
            strokeWidth:e.target.value
          }
        }
      }
      return els;
    })
    dispatch(setElements(newElements));
  }
  return (
    <AddGroupWrapper onSubmit={addNewGroup}>
      <label>Stroke Width:</label>
      <input type="number" onChange={strokeWidthChange} min={1} step={0.2} defaultValue={1.2} />
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
      <HorizontalDivider theme={theme}/>
    </AddGroupWrapper>
  );
}
