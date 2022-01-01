import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button, Form, Label, FormGroup } from "reactstrap";
import { flowNamespace } from "../../../../../App";
import { setModal } from "../../../../../store/reducers/componentReducer";
import useAuth from "../../../../../utils/useAuth";

export default function EditFlow({ flow }) {
  const dispatch = useDispatch();
  const auth = useAuth();
  const [flowConfig, setFlowConfig] = useState({
    name: flow.config.name,
    description: flow.config.description,
    createdBy:auth._id
  });

  const onChangeHandler = (e) => {
    setFlowConfig({
      ...flowConfig,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmitHandle = (e) => {
    e.preventDefault();
    flowNamespace.emit('flows:update',{flow,flowConfig})
    dispatch(setModal(false));
  };
  return (
    <Form onSubmit={onSubmitHandle}>
      <FormGroup>
        <Label>Flow Name</Label>
        <Input
          name="name"
          placeholder="flow name"
          onChange={onChangeHandler}
          value={flowConfig.name}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Description</Label>
        <Input
          type="textarea"
          name="description"
          placeholder="description"
          value={flowConfig.description}
          onChange={onChangeHandler}
        />
      </FormGroup>
      <Button type="submit">Submit</Button>
    </Form>
  );
}