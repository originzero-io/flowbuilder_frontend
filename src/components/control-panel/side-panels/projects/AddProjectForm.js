import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { addProject } from "../../../../store/actions/controlPanelActions";
import uuid from "react-uuid"
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const FormItem = styled.div``;
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
      <FormItem>
        <label>Project Name</label>
        <input name="name" onChange={onChangeHandler} />
      </FormItem>
      <FormItem>
        <label>Author</label>
        <input name="author" onChange={onChangeHandler} />
      </FormItem>
      <input type="submit" />
    </Form>
  );
}
