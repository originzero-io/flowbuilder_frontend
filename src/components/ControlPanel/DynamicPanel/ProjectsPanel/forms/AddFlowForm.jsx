import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createFlow } from "../../../../../store/reducers/flow/flowReducer";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { setModal } from "../../../../../store/reducers/componentReducer";
import { createFlowService } from "../../../../../services/flowService";
import { setError } from "../../../../../store/reducers/errorReducer";
import { flowNamespace } from "../../../../../App";

export default function AddFlowForm() {
  const auth = useSelector((state) => state.auth);
  const { activeWorkspace } = useSelector((state) => state.workspaces);
  const { activeProject, projects } = useSelector(
    (state) => state.projects
  );
  const workspace = activeWorkspace._id;
  const project = activeProject?._id || projects[0];

  const [flowInfo, setFlowInfo] = useState({
    name: "Flow 1",
    description: "Created for future",
    company: "Anaks ARGE Ltd.Şti.",
    createdBy: auth._id,
  });
  const dispatch = useDispatch();
  const onChangeHandler = (e) => {
    //setFlowInfo({ ...flowInfo, [e.target.name]: e.target.value });
    setFlowInfo({ ...flowInfo, [e.target.name]: e.target.value });
  };
  const onSubmitHandle = (e) => {
    e.preventDefault();
    const flow = { config: flowInfo, workspace, project };
    flowNamespace.emit("flows:create", { flow });
    dispatch(setModal(false));
  };

  return (
    <Form onSubmit={onSubmitHandle}>
      <FormGroup>
        <Label>Flow Name</Label>
        <Input
          style={{ color: "green" }}
          name="name"
          placeholder="flow name"
          onChange={onChangeHandler}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Company</Label>
        <Input
          style={{ color: "green" }}
          defaultValue={flowInfo.company}
          name="company"
          placeholder="company"
          onChange={onChangeHandler}
        />
      </FormGroup>
      <FormGroup>
        <Label>Description</Label>
        <Input
          style={{ color: "green" }}
          type="textarea"
          name="description"
          defaultValue={flowInfo.description}
          placeholder="description"
          onChange={onChangeHandler}
        />
      </FormGroup>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
