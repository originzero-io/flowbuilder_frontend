import React from "react";
import { useSelector } from "react-redux";
import { DynamicPanelContainer } from "../style";
export default function SettingsPanel() {
  const auth = useSelector((state) => state.auth);
  return (
    <DynamicPanelContainer>
      <div>{auth.username}</div>
      <div>{auth.name}</div>
      <div>{auth.email}</div>
      <div>{auth.role}</div>
    </DynamicPanelContainer>
  );
}
