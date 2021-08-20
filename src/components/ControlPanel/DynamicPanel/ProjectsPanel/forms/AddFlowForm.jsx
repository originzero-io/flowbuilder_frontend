import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFlow } from "../../../../../store/actions/flowActions";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { setModal } from "../../../../../store/actions/componentActions";
import { createFlowService } from "../../../../../services/flowService";
import { setError } from "../../../../../store/actions/errorActions";

export default function AddFlowForm() {
  const auth = useSelector(state => state.authReducer);
  const { activeTeam } = useSelector(state => state.teamReducer);
  const { activeProject,projects } = useSelector(state => state.projectReducer);
  const [flowInfo, setFlowInfo] = useState({
    name: "Flow 1",
    author: "Akın Şibay",
    description: "Created for future",
    company: "Anaks ARGE Ltd.Şti.",
    teamId: activeTeam._id,
    projectId: activeProject?._id || projects[0],
    createdBy: auth.username
});
  const dispatch = useDispatch();
  const onChangeHandler = (e) => {
    setFlowInfo({ ...flowInfo, [e.target.name]: e.target.value });
  };
  const onSubmitHandle = (e) => {
    e.preventDefault();
    createFlowService(flowInfo)
      .then((res) => {
        dispatch(addFlow(res.flow));
        dispatch(setModal(false))
      })
      .catch(err => dispatch(setError(err)));
  };

  return (
      <Form onSubmit={onSubmitHandle}>
        <FormGroup>
          <Label>Flow Name</Label>
          <Input
            name="name"
            placeholder="flow name"
            onChange={onChangeHandler}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Author</Label>
          <Input
            name="author"
            placeholder="author"
            onChange={onChangeHandler}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Company</Label>
          <Input
            name="company"
            placeholder="company"
            onChange={onChangeHandler}
          />
        </FormGroup>
        <FormGroup>
          <Label>Description</Label>
          <Input
            type="textarea"
            name="description"
            placeholder="description"
            onChange={onChangeHandler}
          />
        </FormGroup>
        <Button type="submit">Submit</Button>
      </Form>
  );
}
