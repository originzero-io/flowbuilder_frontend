import React, { useState } from "react";
import styled from "styled-components";
import { SubmitIcon } from "../../../global/SvgIcons";
import { Submit } from "../../../menus/group-bar/style";
import { useSelector, useDispatch } from "react-redux";
import { isNode } from "react-flow-renderer";
import {
  changeNodeName,
  setElements,
} from "../../../../REDUX/actions/flowActions";
import { displayPartsToString } from "typescript";
const Form = styled.form`
  position: relative;
`;
const Input = styled.input`
  width: 100%;
  background-color: transparent;
  border: 1px dotted #636e72;
  border-radius: 2px;
  user-select: none;
  padding-left: 4px;
  color: whitesmoke;
`;
export default function EditNameForm({ self, setEdit }) {
  const dispatch = useDispatch();
  const [editedName, setEditedName] = useState(self.data.label);
  const elements = useSelector((state) => state.elementReducer);
  const nameEditChangeHandle = (e) => {
    setEditedName(e.target.value);
  };
  const onSubmitHandle = (e) => {
    e.preventDefault();
    setEdit(false);
    dispatch(changeNodeName(self, editedName));
  };
  return (
    <Form onSubmit={onSubmitHandle}>
      <Input
        onChange={nameEditChangeHandle}
        value={editedName}
        maxLength={15}
        required
        className="nodrag nowheel"
      />
      <Submit type="submit">
        <SubmitIcon width="15px" height="15px" color="whitesmoke" />
      </Submit>
    </Form>
  );
}
