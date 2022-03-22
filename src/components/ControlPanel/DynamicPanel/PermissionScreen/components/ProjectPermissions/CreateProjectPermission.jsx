import React from "react";
import PropTypes from "prop-types";
import { PermissionContent, PermissionHeader } from "../PermissionScreen.style";
import Checkbox from "components/Shared/SwitchInput/Checkbox";

function CreateProjectPermission({ permissions, handleChange }) {
  return (
    <>
      <PermissionHeader>Project Create</PermissionHeader>
      <PermissionContent>
        <Checkbox
          name="CAN_CREATE_PROJECT"
          size="30px"
          center={true}
          defaultChecked={permissions.CAN_CREATE_PROJECT}
          disabled={permissions.EVERYTHING}
          checked={permissions.EVERYTHING || permissions.CAN_CREATE_PROJECT}
          onChange={(e) => handleChange(e)}
        />
      </PermissionContent>
    </>
  );
}

CreateProjectPermission.propTypes = {
  permissions: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default CreateProjectPermission;
