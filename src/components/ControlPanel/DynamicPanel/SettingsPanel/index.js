import React from "react";
import { useSelector } from "react-redux";
export default function SettingsPanel() {
  const user = useSelector((state) => state.authReducer);
  return (
    <>
      <div>{user.username}</div>
      <div>{user.name}</div>
      <div>{user.email}</div>
      <div>{user.role}</div>
    </>
  );
}
