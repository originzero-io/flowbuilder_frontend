import React, { useState } from "react";
import PropTypes from "prop-types";
import { Alert, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useDispatch } from "react-redux";

const propTypes = {
  permissions: PropTypes.object.isRequired,
};
export default function Presets({ permissions }) {
  const dispatch = useDispatch();
  const [presetName, setPresetName] = useState("");
  const onSubmitHandle = (e) => {
    e.preventDefault();
    const preset = {
      name: presetName,
      permissions: permissions,
    };
    console.log("PRESET: ", preset);
  };
  const onChangeHandler = (e) => {
    setPresetName(e.target.value);
  };
  return (
    <>
      <Form onSubmit={onSubmitHandle}>
        <FormGroup>
          <Label>Assign name for this permission preferences</Label>
          <Input
            name="presetName"
            placeholder="name"
            onChange={onChangeHandler}
          />
        </FormGroup>
        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
}

Presets.propTypes = propTypes;
