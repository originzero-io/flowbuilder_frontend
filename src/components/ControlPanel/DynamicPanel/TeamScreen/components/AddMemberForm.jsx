import React, { useState } from "react";
import useUser from "../../../../../hooks/useUser";
import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import { BsPlusCircle } from "react-icons/bs";
import { TiTickOutline } from "react-icons/ti";
import useWorkspace from "../../../../../hooks/useWorkspace";
import Avatar from "../../../../Shared/Avatar";
import { useDispatch } from "react-redux";
import {
  addUserToWorkspace,
  assignPermissionToMember,
  removeUserToWorkspace,
} from "../../../../../store/reducers/userReducer";

const UserItem = styled.div`
  margin-left: 10px;
`;
const Container = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;
export default function AddMemberForm() {
  const dispatch = useDispatch();
  const permissions = {
    CAN_CREATE_PROJECT: true,
    CAN_EDIT_PROJECT: true,
    CAN_DELETE_PROJECT: true,
    CAN_CREATE_FLOW: true,
    CAN_EDIT_FLOW: true,
    CAN_DELETE_FLOW: true,
    CAN_CREATE_DEVICE: true,
    CAN_EDIT_DEVICE: true,
    CAN_DELETE_DEVICE: true,
    CAN_CREATE_USER: true,
    CAN_EDIT_USER: true,
    CAN_DELETE_USER: true,
  }
  const users = useUser();
  const { activeWorkspace } = useWorkspace();
  const addMemberHandle = (user) => {
    dispatch(addUserToWorkspace(user, activeWorkspace));
    dispatch(assignPermissionToMember(user, activeWorkspace, permissions));

  };
  const removeMemberHandle = (user) => {
    dispatch(removeUserToWorkspace(user, activeWorkspace));
  };
  return (
    <div>
      {users.map((user) => {
        return (
          <Container key={user._id}>
            <Avatar avatar={user.avatar} />
            <UserItem>{user.username}</UserItem>
            {user.workspaces.some(workspace=>workspace._id === activeWorkspace._id) ? (
              <TiTickOutline
                style={{ fontSize: "30px" }}
                onClick={() => removeMemberHandle(user)}
              />
            ) : (
              <BsPlusCircle
                style={{ fontSize: "24px" }}
                onClick={() => addMemberHandle(user)}
              />
            )}
          </Container>
        );
      })}
    </div>
  );
}
