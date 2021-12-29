import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { createWorkspace } from "../../../store/reducers/workspaceReducer";
import { setModal } from "../../../store/reducers/componentReducer";
import { workspaceNamespace } from "../../../App";
import useAuth from "../../../utils/useAuth";
import { addUserToWorkspace, assignPermissionToMember } from "../../../store/reducers/userReducer";
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
  // const permissions = {
  //   CAN_CREATE_PROJECT: true,
  //   CAN_EDIT_PROJECT: true,
  //   CAN_DELETE_PROJECT: true,
  //   CAN_CREATE_FLOW: true,
  //   CAN_EDIT_FLOW: true,
  //   CAN_DELETE_FLOW: true,
  //   CAN_CREATE_DEVICE: true,
  //   CAN_EDIT_DEVICE: true,
  //   CAN_DELETE_DEVICE: true,
  //   CAN_CREATE_USER: true,
  //   CAN_EDIT_USER: true,
  //   CAN_DELETE_USER: true,
  // }
  const onSubmitHandle = (e) => {
    e.preventDefault();
    workspaceNamespace.emit("workspaces:create", { workspace: workspaceInfo });
    dispatch(addUserToWorkspace(auth, workspaceInfo));
    //workspaceInfonun _id si yok!! 
    //dispatch(assignPermissionToMember(auth, workspaceInfo, permissions));
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
