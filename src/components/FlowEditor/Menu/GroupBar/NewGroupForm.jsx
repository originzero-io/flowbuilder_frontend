import React, { useState } from "react";
import { isNode, useStoreActions } from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import uuid from "react-uuid";
import * as themeColor from "../../../../config/ThemeReference";
import { createGroupService } from "../../../../services/groupService";
import { addGroup } from "../../../../store/actions/nodeGroupsActions";
import {
  AddIcon,
  CancelIcon,
  NonGroupIcon,
  SubmitIcon
} from "../../../Global/icons";
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

const NewGroupForm = ({ theme }) => {
  const [formOpen, setFormOpen] = useState(false);
  const { flowElements } = useSelector((state) => state.activeFlow);
  const auth = useSelector((state) => state.auth);
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
    const response = await createGroupService(flowId, groupInfo);
    dispatch(addGroup(response.group))
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