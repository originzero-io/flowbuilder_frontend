import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addDashboard,
  addFlow,
  addNewFlowToProject,
} from "../../../../../store/actions/controlPanelActions";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import uuid from "react-uuid";

export default function AddDashboardForm({ closeModal }) {
  const { activeProject,flows } = useSelector((state) => state.controlPanelReducer);

  const [dashboardInfo, setDashboardInfo] = useState({
    id: null,
    name: null,
    author: null,
    description: null,
    projectId: null
  });
  const dispatch = useDispatch();
  const onChangeHandler = (e) => {
    setDashboardInfo({ ...dashboardInfo, [e.target.name]: e.target.value });
  };
  const onSubmitHandle = (e) => {
    e.preventDefault();
    const dashboard = {id:uuid(),...dashboardInfo,projectId:activeProject.id}
    dispatch(addDashboard(dashboard));
    closeModal();
  };

  return (
    <Form onSubmit={onSubmitHandle}>
      <FormGroup>
        <Label>Dashboard Name</Label>
        <Input
          name="name"
          placeholder="dashboard name"
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
