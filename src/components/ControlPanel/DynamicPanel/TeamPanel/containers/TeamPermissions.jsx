import React from "react";
import Checkbox from "../components/Checkbox";
import {
  PermissionContainer,
  PermissionContent,
  TabContainer,
  PermissionHeader,
} from "../components/style";
export default function TeamPermissions() {
  return (
    <TabContainer>
        <PermissionContainer>
          <PermissionHeader>Invite Member</PermissionHeader>
          <PermissionContent>
              <Checkbox name="all" size="30px" defaultChecked={false} center={true} />
          </PermissionContent>
        </PermissionContainer>
        <PermissionContainer>
          <PermissionHeader>Remove Member</PermissionHeader>
          <PermissionContent>
              <Checkbox name="all" size="30px" defaultChecked={false} center={true} />
          </PermissionContent>
        </PermissionContainer>
        <PermissionContainer>
          <PermissionHeader>Assign Permission</PermissionHeader>
          <PermissionContent>
              <Checkbox name="all" size="30px" defaultChecked={false} center={true} />
          </PermissionContent>
        </PermissionContainer>
    </TabContainer>
  );
}
