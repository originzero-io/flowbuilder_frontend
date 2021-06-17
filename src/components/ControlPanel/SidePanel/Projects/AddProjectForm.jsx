import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProject } from "../../../../store/actions/controlPanelActions";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import uuid from "react-uuid"
export default function AddProjectForm({ closeModal }) {
  const [projectInfo, setProjectInfo] = useState({
    name: null,
    author: null,
    flows:[]
  });
  const dispatch = useDispatch();
  const onChangeHandler = (e) => {
    setProjectInfo({ ...projectInfo, [e.target.name]: e.target.value });
  };
  const onSubmitHandle = (e) => {
    e.preventDefault();
    console.log({id:`project${uuid()}`,...projectInfo});
    dispatch(addProject({id:`project${uuid()}`,...projectInfo}));
    closeModal();
  };
  return (
    <Form onSubmit={onSubmitHandle}>
      <FormGroup>
        <Label>Project Name</Label>
        <Input name="name" placeholder="project name" onChange={onChangeHandler} required/>
      </FormGroup>
      <FormGroup>
        <Label>Author</Label>
        <Input name="author" placeholder="author" onChange={onChangeHandler} required/>
      </FormGroup>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
