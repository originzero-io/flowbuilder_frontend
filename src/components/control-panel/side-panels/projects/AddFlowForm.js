import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { addNewFlowToProject, addProject } from "../../../../store/actions/controlPanelActions";
import uuid from "react-uuid"
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const FormItem = styled.div``;
export default function AddFlowForm({ closeModal,activeProject }) {
  const [flowInfo, setFlowInfo] = useState({
    name: null,
    author: null,
    description:null
  });
  const dispatch = useDispatch();
  const onChangeHandler = (e) => {
    setFlowInfo({ ...flowInfo, [e.target.name]: e.target.value });
  };
  const onSubmitHandle = (e) => {
    e.preventDefault();
    //console.log({id:`project${uuid()}`,...projectInfo});
    
    dispatch(addNewFlowToProject(activeProject,flowInfo));
    closeModal();
  };
  return (
    <Form onSubmit={onSubmitHandle}>
      <FormItem>
        <label>Flow Name</label>
        <input name="name" onChange={onChangeHandler} />
      </FormItem>
      <FormItem>
        <label>Author</label>
        <input name="author" onChange={onChangeHandler} />
      </FormItem>
      <FormItem>
        <label>Description</label>
        <input name="description" onChange={onChangeHandler} />
      </FormItem>
      <input type="submit" />
    </Form>
  );
}
