import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { setModal } from "store/reducers/componentSlice";
import useProject from "utils/hooks/useProject";
import projectServiceSocket from "services/configurationService/projectService/projectService.event";

const EditProjectForm = ({ project }) => {
  const { activeProject } = useProject();
  const [projectInfo, setprojectInfo] = useState({
    name: null,
  });
  const dispatch = useDispatch();
  const onChangeHandler = (e) => {
    setprojectInfo({ ...projectInfo, [e.target.name]: e.target.value });
  };
  const onSubmitHandle = (e) => {
    e.preventDefault();
    projectServiceSocket.updateProject({ project, projectInfo });

    dispatch(setModal(false));
  };
  return (
    <Form onSubmit={onSubmitHandle}>
      <FormGroup>
        <Input
          name="name"
          placeholder="Workspace name"
          onChange={onChangeHandler}
          defaultValue={activeProject.name}
          required
        />
      </FormGroup>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default EditProjectForm;
