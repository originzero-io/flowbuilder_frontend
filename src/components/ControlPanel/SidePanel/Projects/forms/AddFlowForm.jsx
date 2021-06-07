import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addFlow,
  addNewFlowToProject,
} from "../../../../../store/actions/controlPanelActions";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import uuid from "react-uuid";

export default function AddFlowForm({ closeModal,formType }) {
  const { activeProject,flows } = useSelector((state) => state.controlPanelReducer);

  const [flowInfo, setFlowInfo] = useState({
    id: null,
    name: null,
    author: null,
    description: null,
    projectId: null
  });
  const dispatch = useDispatch();
  const onChangeHandler = (e) => {
    setFlowInfo({ ...flowInfo, [e.target.name]: e.target.value });
  };
  const onSubmitHandle = (e) => {
    e.preventDefault();
    const flow = {id:uuid(),...flowInfo,projectId:activeProject.id}
    dispatch(addFlow(flow));
    closeModal();
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
