import React from "react";
import useAuth from "../../../../hooks/useAuth";
import Avatar from "../../../Shared/Avatar";
export default function SettingsScreen() {
  const auth = useAuth();
  return (
    <>
      <Avatar avatar={auth.avatar} size={144}/>
      <div>{auth.username}</div>
      <div>{auth.name}</div>
      <div>{auth.email}</div>
      <div>{auth.role}</div>
    </>
  );
}
