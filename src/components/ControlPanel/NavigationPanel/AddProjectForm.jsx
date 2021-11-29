import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { createProjectService } from "../../../services/projectService";
import { createProject } from "../../../store/reducers/projectReducer";
import { setError } from "../../../store/reducers/errorReducer";
import { setModal } from "../../../store/reducers/componentReducer";
import { projectNamespace } from "../../../App";
const AddProjectForm = () => {
  const { activeWorkspace } = useSelector((state) => state.workspaces);
  const auth = useSelector((state) => state.auth);
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