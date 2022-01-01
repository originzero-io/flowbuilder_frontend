import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { projectNamespace } from "../../../App";
import { setModal } from "../../../store/reducers/componentReducer";
import useAuth from "../../../utils/useAuth";
import useWorkspace from "../../../utils/useWorkspace";
const AddProjectForm = () => {
  const { activeWorkspace } = useWorkspace();
  const auth = useAuth();
  const [projectInfo, setProjectInfo] = useState({
    name: null,
    description: '',
    createdBy: auth._id,
    workspace: activeWorkspace._id
  });
  const dispatch = useDispatch();
  const onChangeHandler = (e) => {
    setProjectInfo({ ...projectInfo, [e.target.name]: e.target.value });
  };
  const onSubmitHandle = (e) => {
    e.preventDefault();
    projectNamespace.emit('projects:create', { project: projectInfo });
    dispatch(setModal(false));
  };
  return (
      <Form onSubmit={onSubmitHandle}>
        <FormGroup>
          <Label>Project Name</Label>
          <Input name="name" placeholder="project name" onChange={onChangeHandler} required/>
        </FormGroup>
        <FormGroup>
          <Label>Description</Label>
          <Input name="description" placeholder="description" onChange={onChangeHandler}/>
        </FormGroup>
        <Button type="submit">Submit</Button>
      </Form>
  );
}

export default AddProjectForm;