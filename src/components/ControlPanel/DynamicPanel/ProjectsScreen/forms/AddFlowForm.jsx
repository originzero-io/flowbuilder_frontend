import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { setModal } from "store/reducers/componentSlice";
import useAuth from "utils/hooks/useAuth";
import useProject from "utils/hooks/useProject";
import useWorkspace from "utils/hooks/useWorkspace";
import flowServiceSocket from "services/configurationService/flowService/flowService.socket";

export default function AddFlowForm() {
  const auth = useAuth();
  const { activeWorkspace } = useWorkspace();
  const { activeProject, projects } = useProject();
  const workspace = activeWorkspace._id;
  const project = activeProject?._id || projects[0];

  const [flowInfo, setFlowInfo] = useState({
    name: "Untitled",
    description: "Created for future",
    company: "Anaks ARGE Ltd.Şti.",
    createdBy: auth._id,
  });
  const dispatch = useDispatch();
  const onChangeHandler = (e) => {
    // setFlowInfo({ ...flowInfo, [e.target.name]: e.target.value });
    setFlowInfo({ ...flowInfo, [e.target.name]: e.target.value });
  };
  const onSubmitHandle = (e) => {
    e.preventDefault();
    const flow = { config: flowInfo, workspace, project };
    flowServiceSocket.createFlow({ flow });
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
