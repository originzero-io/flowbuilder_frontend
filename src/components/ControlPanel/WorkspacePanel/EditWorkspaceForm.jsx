import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { editWorkspace } from "../../../store/actions/workspaceActions";
import { setModal } from "../../../store/actions/componentActions";
export default function EditTeamForm() {
  const { activeWorkspace } = useSelector((state) => state.workspaces);
  const [workspaceInfo, setworkspaceInfo] = useState({
    name: null,
  });
  const dispatch = useDispatch();
  const onChangeHandler = (e) => {
    setworkspaceInfo({ ...workspaceInfo, [e.target.name]: e.target.value });
  };
  const onSubmitHandle = (e) => {
    e.preventDefault();
    dispatch(editWorkspace(activeWorkspace,workspaceInfo));
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
