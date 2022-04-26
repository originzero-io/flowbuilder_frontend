import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Input } from "reactstrap";
import PermissionService from "services/configurationService/permissionService";
import { setModal } from "store/reducers/componentReducer";
import { loadPermission } from "store/reducers/userPermissionReducer";

export default function PresetList() {
  const [presets, setPresets] = useState([]);
  const [selectedPreset, setSelectedPreset] = useState([]);
  const dispatch = useDispatch();
  useEffect(async () => {
    const data = await PermissionService.getPresets();
    console.log("data:", data);
    setPresets(data.presets);
  }, []);
  const onSubmitHandle = () => {
    dispatch(loadPermission(selectedPreset));
    dispatch(setModal(false))
  };
  const handlePresetChange = (e) => {
    console.log("submitt", e.target.value);
    const selected = presets.find(
      (preset) => preset.name === e.target.value
    ).preset;
    setSelectedPreset(selected);
  };
  return (
    <>
      <Input type="select" onChange={handlePresetChange}>
        {presets.map((preset) => {
          return <option key={preset._id}>{preset.name}</option>;
        })}
      </Input>
      <Button onClick={onSubmitHandle}>Submit</Button>
    </>
  );
}