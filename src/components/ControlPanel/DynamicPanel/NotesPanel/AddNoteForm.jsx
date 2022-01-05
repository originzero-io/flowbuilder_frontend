import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { noteNamespace } from "../../../../App";
import { setModal } from "../../../../store/reducers/componentReducer";
import useAuth from "../../../../utils/useAuth";
import useWorkspace from "../../../../utils/useWorkspace";
const AddNoteForm = () => {
  const dispatch = useDispatch();
  const { activeWorkspace } = useWorkspace();
  const auth = useAuth();
  const [noteInfo, setNoteInfo] = useState({
    title: null,
    content: '',
    createdBy: auth._id,
    workspace: activeWorkspace._id
  });
  const onChangeHandler = (e) => {
    setNoteInfo({ ...noteInfo, [e.target.name]: e.target.value });
  };
  const onSubmitHandle = (e) => {
    e.preventDefault();
    noteNamespace.emit('notes:create', { note: noteInfo });
    dispatch(setModal(false));
  };
  return (
      <Form onSubmit={onSubmitHandle}>
        <FormGroup>
          <Label>Title</Label>
          <Input name="title" placeholder="Title" onChange={onChangeHandler} required/>
        </FormGroup>
        <FormGroup>
          <Label>Content</Label>
          <Input name="content" placeholder="Content" type="textarea" onChange={onChangeHandler} required/>
        </FormGroup>
        <Button type="submit">Create</Button>
      </Form>
  );
}

export default AddNoteForm;