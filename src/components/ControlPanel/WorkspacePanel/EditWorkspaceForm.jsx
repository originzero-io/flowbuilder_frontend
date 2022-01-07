import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { editWorkspace } from "../../../store/reducers/workspaceReducer";
import { setModal } from "../../../store/reducers/componentReducer";
import { workspaceNamespace } from "../../global/SocketConnections";
import useWorkspace from "../../../utils/useWorkspace";
export default function EditWorkspaceForm({ workspace }) {
  const { activeWorkspace } = useWorkspace();
  const [workspaceInfo, setworkspaceInfo] = useState({
    name: null,
  });
  const dispatch = useDispatch();
  const onChangeHandler = (e) => {
    setworkspaceInfo({ ...workspaceInfo, [e.target.name]: e.target.value });
  };
  const onSubmitHandle = (e) => {
    e.preventDefault();
    workspaceNamespace.emit("workspaces:update", { workspace, workspaceInfo });
    dispatch(setModal(false));
  };
  return (
    <Form onSubmit={onSubmitHandle}>
      <FormGroup>
        <Input
          name="name"
          placeholder="Workspace name"
          onChange={onChangeHandler}
          defaultValue={activeWorkspace.name}
          required
        />
      </FormGroup>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
