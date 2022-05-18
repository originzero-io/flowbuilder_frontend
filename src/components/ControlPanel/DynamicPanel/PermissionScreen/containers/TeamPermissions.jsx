import React from "react";
import { useDispatch } from "react-redux";
import Checkbox from "components/Shared/SwitchInput/Checkbox";
import {
  PermissionContainer,
  PermissionContent,
  TabContainer,
  PermissionHeader,
} from "../components/PermissionScreen.style";
import PropTypes from "prop-types";

const propTypes = {
  permissions: PropTypes.object.isRequired,
  setSinglePermission: PropTypes.func,
};

export default function TeamPermissions({ permissions, setSinglePermission }) {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(setSinglePermission(e, "team"));
  };
  return (
    <TabContainer>
      <PermissionContainer>
        <PermissionHeader>Invite Member</PermissionHeader>
        <PermissionContent>
          <Checkbox
            name="CAN_INVITE_MEMBER"
            size="30px"
            defaultChecked={permissions.CAN_INVITE_MEMBER}
            center={true}
            onChange={(e) => handleChange(e)}
            disabled={permissions.EVERYTHING}
            checked={permissions.EVERYTHING || permissions.CAN_INVITE_MEMBER}
          />
        </PermissionContent>
      </PermissionContainer>
      <PermissionContainer>
        <PermissionHeader>Remove Member</PermissionHeader>
        <PermissionContent>
          <Checkbox
            name="CAN_REMOVE_MEMBER"
            size="30px"
            defaultChecked={permissions.CAN_REMOVE_MEMBER}
            center={true}
            onChange={(e) => handleChange(e)}
            disabled={permissions.EVERYTHING}
            checked={permissions.EVERYTHING || permissions.CAN_REMOVE_MEMBER}
          />
        </PermissionContent>
      </PermissionContainer>
      <PermissionContainer>
        <PermissionHeader>Assign Permission</PermissionHeader>
        <PermissionContent>
          <Checkbox
            name="CAN_ASSIGN_PERMISSION"
            size="30px"
            defaultChecked={permissions.CAN_ASSIGN_PERMISSION}
            center={true}
            onChange={(e) => handleChange(e)}
            disabled={permissions.EVERYTHING}
            checked={
              permissions.EVERYTHING || permissions.CAN_ASSIGN_PERMISSION
            }
          />
        </PermissionContent>
      </PermissionContainer>
    </TabContainer>
  );
}

TeamPermissions.propTypes = propTypes;
