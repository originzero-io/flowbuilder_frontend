import React from "react";
import { useSelector } from "react-redux";
export default function SettingsPanel() {
  const auth = useSelector((state) => state.auth);
  return (
    <>
      <div>{auth.username}</div>
      <div>{auth.name}</div>
      <div>{auth.email}</div>
      <div>{auth.role}</div>
    </>
  );
}
