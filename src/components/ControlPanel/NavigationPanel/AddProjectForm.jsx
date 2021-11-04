import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { createProjectService } from "../../../services/projectService";
import { createProject } from "../../../store/actions/projectActions";
import { setError } from "../../../store/actions/errorActions";
import { setModal } from "../../../store/actions/componentActions";
const AddProjectForm = () => {
  const { activeTeam } = useSelector((state) => state.teamReducer);
  const auth = useSelector((state) => state.authReducer);
  const [projectInfo, setProjectInfo] = useState({
    name: null,
    description: '',
    createdBy: auth._id,
    team: activeTeam._id
  });
  const dispatch = useDispatch();
  const onChangeHandler = (e) => {
    setProjectInfo({ ...projectInfo, [e.target.name]: e.target.value });
  };
  const onSubmitHandle = (e) => {
    e.preventDefault();
    createProjectService(projectInfo)
      .then(res => {
        dispatch(createProject(res.project));
        dispatch(setModal(false));
    })
      .catch(err => dispatch(setError(err)));
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