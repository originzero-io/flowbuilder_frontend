import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { setModal } from "store/reducers/componentSlice";
import useAuth from "utils/hooks/useAuth";
import useWorkspace from "utils/hooks/useWorkspace";
import noteServiceSocket from "services/configurationService/noteService/noteService.event";

const AddNoteForm = () => {
  const dispatch = useDispatch();
  const { activeWorkspace } = useWorkspace();
  const auth = useAuth();
  const [noteInfo, setNoteInfo] = useState({
    title: null,
    content: "",
    createdBy: auth._id,
    workspace: activeWorkspace._id,
  });
  const onChangeHandler = (e) => {
    setNoteInfo({ ...noteInfo, [e.target.name]: e.target.value });
  };
  const onSubmitHandle = (e) => {
    e.preventDefault();
    noteServiceSocket.createNote({ note: noteInfo });
    dispatch(setModal(false));
  };
  return (
    <Form onSubmit={onSubmitHandle}>
      <FormGroup>
        <Label>Title</Label>
        <Input
          name="title"
          placeholder="Title"
          onChange={onChangeHandler}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Content</Label>
        <Input
          name="content"
          placeholder="Content"
          type="textarea"
          onChange={onChangeHandler}
          required
        />
      </FormGroup>
      <Button type="submit">Create</Button>
    </Form>
  );
};

export default AddNoteForm;
