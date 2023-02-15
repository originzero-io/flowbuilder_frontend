import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { projectNamespace } from "SocketConnections";
import { setModal } from "store/reducers/componentSlice";
import useProject from "hooks/useProject";

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
    projectNamespace.emit("projects:update", { project, projectInfo });
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
