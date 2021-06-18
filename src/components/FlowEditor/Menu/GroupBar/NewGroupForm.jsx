import React, { useState } from "react";
import { isNode, useStoreActions } from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";
import * as themeColor from "../../../../config/ThemeReference";
import { addGroup } from "../../../../store/actions/nodeGroupsActions";
import {
  AddIcon,
  CancelIcon,
  NonGroupIcon,
  SubmitIcon
} from "../../../global/icons";
import { HorizontalDivider } from "../../../style-components/Divider";
import {
  AddGroupWrapper,
  ColorInput,
  Header,
  IconWrapper,
  Input,
  InputWrapper,
  Submit,
  Title
} from "./style";

export default function NewGroupForm({ theme }) {
  const [groupInfo, setGroupInfo] = useState({});
  const [formOpen, setFormOpen] = useState(false);
  const { elementReducer } = useSelector((state) => state.activeFlowReducer);
  const elements = elementReducer.present;
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
        name: groupInfo.name,
        color: groupInfo.color,
      })
    );
  };
  const selectNonGroupsHandle = () => {
    const nonGroups = elements.filter(
      (els) => isNode(els) && els.data.group.id === 0
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
        <NonGroupIcon
          width="40px"
          height="40px"
          onClick={selectNonGroupsHandle}
          theme={theme}
        />
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
      <HorizontalDivider theme={theme} />
    </AddGroupWrapper>
  );
}
