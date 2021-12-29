import React, { useState } from "react";
import useUser from "../../../../utils/useUser";
import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import { BsPlusCircle } from "react-icons/bs";
import { TiTickOutline } from "react-icons/ti";
import useWorkspace from "../../../../utils/useWorkspace";
import Avatar from "../../../global/Avatar";
import { useDispatch } from "react-redux";
import {
  addUserToWorkspace,
  removeUserToWorkspace,
} from "../../../../store/reducers/userReducer";

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
  const users = useUser();
  const { activeWorkspace } = useWorkspace();
  const addMemberHandle = (user) => {
    dispatch(addUserToWorkspace(user, activeWorkspace));
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
