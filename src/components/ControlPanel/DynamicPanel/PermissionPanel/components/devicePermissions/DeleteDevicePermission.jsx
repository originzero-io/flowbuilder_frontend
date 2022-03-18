import React from "react";
import Checkbox from "../shared/Checkbox";
import CheckboxGroup from "../shared/CheckboxGroup";
import { PermissionHeader, PermissionContent } from "../style";
import PropTypes from "prop-types";

export default function DeleteDevicePermission({ permissions, handleChange }) {
  return (
    <>
      <PermissionHeader>Delete</PermissionHeader>
      <PermissionContent>
        <CheckboxGroup label="Controller">
          <Checkbox
            name="CAN_DELETE_CONTROLLER"
            defaultChecked={permissions.CAN_DELETE_CONTROLLER}
            onChange={(e) => handleChange(e)}
            disabled={permissions.EVERYTHING}
            checked={
              permissions.EVERYTHING || permissions.CAN_DELETE_CONTROLLER
            }
          />
        </CheckboxGroup>
        <CheckboxGroup label="Processor">
          <Checkbox
            name="CAN_DELETE_PROCESSOR"
            defaultChecked={permissions.CAN_DELETE_PROCESSOR}
            onChange={(e) => handleChange(e)}
            disabled={permissions.EVERYTHING}
            checked={permissions.EVERYTHING || permissions.CAN_DELETE_PROCESSOR}
          />
        </CheckboxGroup>
      </PermissionContent>
    </>
  );
}

DeleteDevicePermission.propTypes = {
  permissions: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};
