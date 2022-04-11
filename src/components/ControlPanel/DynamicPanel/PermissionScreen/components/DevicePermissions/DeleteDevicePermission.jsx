import React from "react";
import Checkbox from "components/Shared/SwitchInput/Checkbox";
import CheckboxGroup from "components/Shared/SwitchInput/CheckboxGroup";
import { PermissionHeader, PermissionContent } from "../PermissionScreen.style";
import PropTypes from "prop-types";

const propTypes = {
  permissions: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};
export default function DeleteDevicePermission({ permissions, handleChange }) {
  return (
    <>
      <PermissionHeader>Delete</PermissionHeader>
      <PermissionContent>
        <CheckboxGroup
          label="Controller"
          name="CAN_DELETE_CONTROLLER"
          defaultChecked={permissions.CAN_DELETE_CONTROLLER}
          onChange={(e) => handleChange(e)}
          disabled={permissions.EVERYTHING}
          checked={permissions.EVERYTHING || permissions.CAN_DELETE_CONTROLLER}
        />

        <CheckboxGroup
          label="Processor"
          name="CAN_DELETE_PROCESSOR"
          defaultChecked={permissions.CAN_DELETE_PROCESSOR}
          onChange={(e) => handleChange(e)}
          disabled={permissions.EVERYTHING}
          checked={permissions.EVERYTHING || permissions.CAN_DELETE_PROCESSOR}
        />
      </PermissionContent>
    </>
  );
}

DeleteDevicePermission.propTypes = propTypes;
