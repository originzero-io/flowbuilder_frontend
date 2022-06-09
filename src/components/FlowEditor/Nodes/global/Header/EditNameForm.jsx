import React, { useState } from "react";
import styled from "styled-components";
import { SubmitIcon } from "components/Shared/icons";
import { Submit } from "../../../components/Menu/GroupBar/GroupBar.style";
import { useDispatch } from "react-redux";
import {
  changeNodeName,
} from "store/reducers/flow/flowElementsSlice";
import PropTypes from "prop-types"
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

const propTypes = {
  self: PropTypes.object.isRequired,
  setEdit: PropTypes.func.isRequired
};
export default function EditNameForm({ self, setEdit }) {
  const dispatch = useDispatch();
  const [editedName, setEditedName] = useState(self.data.label);
  const nameEditChangeHandle = (e) => {
    setEditedName(e.target.value);
  };
  const onSubmitHandle = (e) => {
    e.preventDefault();
    setEdit(false);
    dispatch(changeNodeName({self: self, newName: editedName}));
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

EditNameForm.propTypes = propTypes;