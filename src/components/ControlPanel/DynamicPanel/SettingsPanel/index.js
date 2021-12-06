import React from "react";
import useAuth from "../../../../utils/useAuth";
import { DynamicPanelContainer } from "../style";
export default function SettingsPanel() {
  const auth = useAuth();
  return (
    <DynamicPanelContainer>
      <div>{auth.username}</div>
      <div>{auth.name}</div>
      <div>{auth.email}</div>
      <div>{auth.role}</div>
    </DynamicPanelContainer>
  );
}
