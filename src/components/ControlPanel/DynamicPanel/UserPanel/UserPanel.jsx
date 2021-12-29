import React from "react";
import { DynamicPanelContainer } from "../style";
import UserList from "./UserList";
export default function UserPanel() {

  return (
    <DynamicPanelContainer>
      <UserList />
    </DynamicPanelContainer>
  );
}
