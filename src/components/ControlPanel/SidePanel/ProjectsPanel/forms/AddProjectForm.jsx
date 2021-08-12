import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { createProjectService } from "../../../../../services/projectService";
import { createProject } from "../../../../../store/actions/projectActions";
import { setError } from "../../../../../store/actions/errorActions";
import errorWrapper from "../../../../../app-global/errorWrapper";
const AddProjectForm = ({ closeModal }) => {
  const { activeTeam } = useSelector((state) => state.teamReducer);
  const [projectInfo, setProjectInfo] = useState({
    name: null,
    author: null,
    description: '',
    teamId: activeTeam._id
  });
  const dispatch = useDispatch();
  const onChangeHandler = (e) => {
    setProjectInfo({ ...projectInfo, [e.target.name]: e.target.value });
  };
  const onSubmitHandle = async (e) => {
    e.preventDefault();
    try {
      const data = await createProjectService(projectInfo);
      dispatch(createProject(data.project));
      closeModal();
    } catch (error) {
      dispatch(setError(error));
    }
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
        <FormGroup>
          <Label>Description</Label>
          <Input name="description" placeholder="description" onChange={onChangeHandler}/>
        </FormGroup>
        <Button type="submit">Submit</Button>
      </Form>
  );
}

export default AddProjectForm;