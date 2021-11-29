import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { updateProject } from "../../../store/reducers/projectReducer";
import { setModal } from "../../../store/reducers/componentReducer";
import { projectNamespace } from "../../../App";
const EditProjectForm = ({project}) => {
  const { activeProject } = useSelector((state) => state.projects);
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
}

export default EditProjectForm;