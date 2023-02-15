import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { createWorkspace } from "store/reducers/workspaceSlice";
import { setModal } from "store/reducers/componentSlice";
import { workspaceNamespace } from "SocketConnections";
import useAuth from "hooks/useAuth";

export default function AddWorkspaceForm() {
  const auth = useAuth();
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
    workspaceNamespace.emit("workspaces:create", { workspace: workspaceInfo });
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
