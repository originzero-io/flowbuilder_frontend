import React from "react";
import Checkbox from "components/Shared/SwitchInput/Checkbox";
import CheckboxGroup from "components/Shared/SwitchInput/CheckboxGroup";
import PropTypes from "prop-types";
import { PermissionHeader, PermissionContent } from "../PermissionScreen.style";

const propTypes = {
  permissions: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};
export default function CreateDevicePermission({ permissions, handleChange }) {
  return (
    <>
      <PermissionHeader>Create</PermissionHeader>
      <PermissionContent>
        <CheckboxGroup
          label="Controller"
          name="CAN_CREATE_CONTROLLER"
          defaultChecked={permissions.CAN_CREATE_CONTROLLER}
          disabled={permissions.EVERYTHING}
          checked={permissions.EVERYTHING || permissions.CAN_CREATE_CONTROLLER}
          onChange={handleChange}
        />
        <CheckboxGroup
          label="Processor"
          name="CAN_CREATE_PROCESSOR"
          ltCheck
          defaued={permissions.CAN_CREATE_PROCESSOR}
          onChange={handleChange}
          disabled={permissions.EVERYTHING}
          checked={permissions.EVERYTHING || permissions.CAN_CREATE_PROCESSOR}
        />
      </PermissionContent>
    </>
  );
}

CreateDevicePermission.propTypes = propTypes;
