import React, { useState } from "react";
import { isNode, useStoreActions } from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import {  useParams } from "react-router";
import * as themeColor from "constants/ThemeReference";
import { createGroup } from "store/reducers/flow/flowGroupsReducer";
import useActiveFlow from "hooks/useActiveFlow";
import useAuth from "hooks/useAuth";
import {
  AddIcon,
  CancelIcon,
  NonGroupIcon,
  SubmitIcon
} from "components/Shared/icons";
import { HorizontalDivider } from "../../../../StyledComponents/Divider";
import {
  AddGroupWrapper,
  ColorInput,
  Header,
  IconWrapper,
  Input,
  InputWrapper,
  Submit,
  Title
} from "./GroupBar.style";

const NewGroupForm = ({ theme }) => {
  const [formOpen, setFormOpen] = useState(false);
  const { flowElements } = useActiveFlow();
  const auth = useAuth();
  const elements = flowElements.present;
  const { flowId } = useParams();
  const setSelectedElements = useStoreActions(
    (actions) => actions.setSelectedElements
    );
  const dispatch = useDispatch();
  const [groupInfo, setGroupInfo] = useState({
    name: "",
    color: "",
    createdBy: auth._id,
    flow:flowId
  });
  const groupHandle = (event) => {
    const { name, value } = event.target;
    setGroupInfo({
      ...groupInfo,
      [name]: value,
    });
  };
  const addNewGroup = async (event) => {
    event.preventDefault();
    dispatch(createGroup(flowId, groupInfo));
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
export default React.memo(NewGroupForm);