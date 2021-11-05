import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button, Form, Label, FormGroup } from "reactstrap";
import { editFlowConfigService } from "../../../../../services/flowService";
import { setModal } from "../../../../../store/actions/componentActions";
import { setError } from "../../../../../store/actions/errorActions";
import { updateFlow } from "../../../../../store/actions/flowActions";

export default function EditFlow({ flow }) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
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
    editFlowConfigService(flow._id, flowConfig)
      .then(res => {
        console.log("RES:", res);
        dispatch(updateFlow(res.flow));
        dispatch(setModal(false));
      })
      .catch((err)=>dispatch(setError(err)));
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
