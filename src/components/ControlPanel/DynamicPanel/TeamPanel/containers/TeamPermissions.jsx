import React from "react";
import { useDispatch } from "react-redux";
import {
  setMultiplePermission,
  setSinglePermission,
} from "../../../../../store/reducers/userPermissionReducer";
import useUserPermission from "../../../../../utils/useUserPermission";
import Checkbox from "../components/Checkbox";
import {
  PermissionContainer,
  PermissionContent,
  TabContainer,
  PermissionHeader,
} from "../components/style";
export default function TeamPermissions() {
  const dispatch = useDispatch();
  const permissions = useUserPermission("team");
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
          />
        </PermissionContent>
      </PermissionContainer>
    </TabContainer>
  );
}
