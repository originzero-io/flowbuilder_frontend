import React from "react";
import Checkbox from "../components/Checkbox";
import {
  PermissionContainer,
  PermissionContent,
  TabContainer,
  PermissionHeader,
} from "../components/style";
export default function MemberPermissions() {
  return (
    <TabContainer>
        <PermissionContainer>
          <PermissionHeader>Invite</PermissionHeader>
          <PermissionContent>
              <Checkbox name="all" size="30px" defaultChecked={false} center={true} />
          </PermissionContent>
        </PermissionContainer>
        <PermissionContainer>
          <PermissionHeader>Remove</PermissionHeader>
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
