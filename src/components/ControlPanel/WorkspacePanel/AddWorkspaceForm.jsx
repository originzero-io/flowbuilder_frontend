import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { createWorkspace } from "../../../store/actions/workspaceActions";
import { setModal } from "../../../store/actions/componentActions";
export default function AddWorkspaceForm() {
  const auth = useSelector((state) => state.auth);
  const [workspaceInfo, setWorkspaceInfo] = useState({
    name: null,
    createdBy: auth._id,
  });
  const dispatch = useDispatch();
  const onChangeHandler = (e) => {
    setWorkspaceInfo({ ...workspaceInfo, [e.target.name]: e.target.value });
  };
  const onSubmitHandle = (e) => {
    e.preventDefault();
    dispatch(createWorkspace(workspaceInfo));
    dispatch(setModal(false));
  };
  return (
    <Form onSubmit={onSubmitHandle}>
      <FormGroup>
        <Input
          name="name"
          placeholder="Workspace name"
          onChange={onChangeHandler}
          required
        />
      </FormGroup>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
