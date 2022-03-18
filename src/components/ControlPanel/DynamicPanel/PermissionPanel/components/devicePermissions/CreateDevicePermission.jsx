import React from "react";
import Checkbox from "../shared/Checkbox";
import CheckboxGroup from "../shared/CheckboxGroup";
import { PermissionHeader, PermissionContent } from "../style";
import PropTypes from 'prop-types'

export default function CreateDevicePermission({ permissions, handleChange }) {
  return (
    <>
      <PermissionHeader>Create</PermissionHeader>
      <PermissionContent>
        <CheckboxGroup label="Controller">
          <Checkbox
            name="CAN_CREATE_CONTROLLER"
            defaultChecked={permissions.CAN_CREATE_CONTROLLER}
            disabled={permissions.EVERYTHING}
            checked={
              permissions.EVERYTHING || permissions.CAN_CREATE_CONTROLLER
            }
            onChange={(e) => handleChange(e)}
          />
        </CheckboxGroup>
        <CheckboxGroup label="Processor">
          <Checkbox
            name="CAN_CREATE_PROCESSOR"
            defaultChecked={permissions.CAN_CREATE_PROCESSOR}
            onChange={(e) => handleChange(e)}
            disabled={permissions.EVERYTHING}
            checked={permissions.EVERYTHING || permissions.CAN_CREATE_PROCESSOR}
          />
        </CheckboxGroup>
      </PermissionContent>
    </>
  );
}

CreateDevicePermission.propTypes = {
    permissions: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired
}

