import React, { useState } from "react";
import PropTypes from "prop-types";
import { Alert, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useDispatch } from "react-redux";
import { savePresetService } from "services/permissionService";
import toast from "react-hot-toast";

const propTypes = {
  permissions: PropTypes.object.isRequired,
};
export default function AddPreset({ permissions }) {
  const dispatch = useDispatch();
  const [presetName, setPresetName] = useState("");
  const onSubmitHandle = async (e) => {
    e.preventDefault();
    const preset = {
      name: presetName,
      preset: permissions,
    };
    try {
      await savePresetService(preset);
      toast.success(`Preferences has been saved as ${preset.name}`);
    } catch (error) {
      toast.error(error.message);
    }
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

AddPreset.propTypes = propTypes;
