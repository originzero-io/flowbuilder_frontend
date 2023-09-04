import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { editWorkspace } from "store/reducers/workspaceSlice";
import { setModal } from "store/reducers/componentSlice";
import useWorkspace from "utils/hooks/useWorkspace";
import workspaceEvent from "services/configurationService/workspaceService/workspaceService.event";

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
    workspaceEvent.updateWorkspace({ workspace, workspaceInfo });
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
