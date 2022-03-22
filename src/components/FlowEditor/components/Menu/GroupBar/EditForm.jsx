import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { setElements, updateGroupOfElement } from "store/reducers/flow/flowElementsReducer";
import { updateGroup } from "store/reducers/flow/flowGroupsReducer";
import { SubmitIcon } from "components/Shared/icons";
import { ColorFlag, Submit } from "./GroupBar.style";
import * as themeColor from "constants/ThemeReference";
import { isEdge, isNode } from "react-flow-renderer";
import PropTypes from "prop-types"
import { updateGroupService } from "services/groupService";
const Form = styled.form`
  position: relative;
  width: 78%;
`;
const Input = styled.input`
  width: 100%;
  height: 23px;
  font-size: 16px;
  //padding-left: 25px;
  padding: 12px 10px 12px 30px;
  background-color: transparent;
  border: 1px solid #636e72;
  border-radius: 2px;
  user-select: none;
  color: ${(props) => (props.theme === "dark" ? "whitesmoke" : "black")};
`;

const propTypes = {
  editableItem: PropTypes.object.isRequired,
  setEditableItem: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
}
export default function EditForm({ editableItem, setEditableItem, theme }) {
  const dispatch = useDispatch();
  const onSubmitHandle = async (event) => {
    event.preventDefault();
    dispatch(updateGroup(editableItem.group));
    dispatch(updateGroupOfElement(editableItem))
    setEditableItem({state:false,group:{}});
  };
  const updateChangeHandle = (event) => {
    const { name, value } = event.target;
    setEditableItem({
      ...editableItem,
      group: {
        ...editableItem.group,
        [name]: value,
      },
    });
  };
  return (
    <>
      <Form onSubmit={onSubmitHandle}>
        <Input
          theme={theme}
          placeholder="edit name"
          required
          onChange={updateChangeHandle}
          name="name"
          value={editableItem.group.name}
          maxLength={12}
        />
        <ColorFlag
          type="color"
          onChange={updateChangeHandle}
          name="color"
          value={editableItem.group.color}
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
      </Form>
    </>
  );
}

EditForm.propTypes = propTypes;