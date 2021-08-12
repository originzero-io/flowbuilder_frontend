import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addFlow } from "../../../../../store/actions/flowActions";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import uuid from "react-uuid";

export default function AddFlowForm({ closeModal, formType }) {
  const { activeProject } = useSelector(
    (state) => state.controlPanelReducer
  );

  const [flowInfo, setFlowInfo] = useState({
    id: uuid(),
    name: null,
    author: null,
    description: null,
    //projectId: activeProject._id,
  });
  const dispatch = useDispatch();
  //const history = useHistory();
  const onChangeHandler = (e) => {
    setFlowInfo({ ...flowInfo, [e.target.name]: e.target.value });
  };
  const onSubmitHandle = (e) => {
    e.preventDefault();
    dispatch(addFlow(flowInfo));
    closeModal();
    //history.push(`/change-tab/${flowInfo.id}`)
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
