import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { setElements } from "../../../REDUX/actions/flowActions";
import { updateGroup } from "../../../REDUX/actions/nodeGroupsActions";
import { SubmitIcon } from "../../global/icons";
import { ColorFlag, Submit } from "./style";
import * as themeColor from "../../../config/ThemeReference";
import { isEdge, isNode } from "react-flow-renderer";

const Form = styled.form`
  position:relative;
  width:78%;
`;
const Input = styled.input`
  width: 100%;
  height: 23px;
  font-size:16px;
  //padding-left: 25px;
  padding:12px 10px 12px 30px;
  background-color: transparent;
  border: 1px solid #636e72;
  border-radius: 2px;
  user-select: none;
  color: ${(props) => (props.theme === "dark" ? "whitesmoke" : "black")};
`;

export default function EditForm({
  editableItem,
  setEditableItem,
  theme
}) {
  const elements = useSelector((state) => state.elementReducer);
  const dispatch = useDispatch();
  const onSubmitHandle = (event) => {
    event.preventDefault();
    dispatch(updateGroup(editableItem.group));

    let updatedNodeId;
    const newArray = elements.map((els) => {
      if (isNode(els)) {
        if (els.data.group.id === editableItem.group.id) {
          updatedNodeId = els.id;
          return {
            ...els,
            data: {
              ...els.data,
              group: { ...els.data.group, name: editableItem.group.name, color: editableItem.group.color },
            },
          };
        }
        else return els;
      }
      else if (isEdge(els)) {
        if (els.source === updatedNodeId) {
          console.log("edgeee:", els);
          console.log("updatedNodeId:", updatedNodeId);
          return {
            ...els,
            style: {
              ...els.style,
              stroke: editableItem.group.color
            }
          }
        }
        else return els;
      }
    });
    dispatch(setElements(newArray));
    setEditableItem({state:false,group:{}});
  };
  const updateChangeHandle = (event) => {
    const { name, value } = event.target;
    setEditableItem({
      ...editableItem,
      group: {
        ...editableItem.group,
        [name]: value,
      }
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
