import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFlow } from "../../../../../store/actions/flowActions";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { setModal } from "../../../../../store/actions/componentActions";
import { createFlowService } from "../../../../../services/flowService";
import { setError } from "../../../../../store/actions/errorActions";

export default function AddFlowForm() {
  const auth = useSelector((state) => state.authReducer);
  const { activeTeam } = useSelector((state) => state.teamReducer);
  const { activeProject, projects } = useSelector(
    (state) => state.projectReducer
  );
  const team = activeTeam._id;
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
    const flow = { config: flowInfo, team, project };
    createFlowService(flow)
      .then((res) => {
        dispatch(addFlow(res.flow));
        dispatch(setModal(false));
      })
      .catch((err) => dispatch(setError(err)));
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
