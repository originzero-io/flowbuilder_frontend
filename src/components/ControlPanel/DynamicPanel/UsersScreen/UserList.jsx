import React, { useEffect, useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { Badge, Button, Table } from "reactstrap";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "store/reducers/componentSlice";
import { deleteUser, getAllUsers } from "store/reducers/userSlice";
import { BiEdit } from "react-icons/bi";
import { VscTrash } from "react-icons/vsc";
import { FaUserCircle } from "react-icons/fa";
import Avatar from "components/Shared/Avatar";
import useUser from "hooks/useUser";
import notification from "utils/notificationHelper";
import EditUserForm from "./EditUserForm";
import AddUserForm from "./AddUserForm";

const UserListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const TBody = styled.tbody`
  &:hover {
    background-color: rgba(46, 213, 115, 0.2);
    transition: background-color 0.2s ease-in-out;
  }
`;
const Td = styled.td``;
const TdItem = styled.span`
  margin-left: 5px;
  margin-right: 5px;
  cursor: pointer;
`;
const Box = styled.div`
  margin-top: 3px;
  cursor: pointer;
  width: 25px;
  height: 25px;
  background: ${(props) => (props.online ? "#4cd137" : "#95a5a6")};
  border-radius: 50%;
`;

export default function UserList() {
  const dispatch = useDispatch();
  const users = useUser();
  const addUserHandle = () => {
    dispatch(setModal(<AddUserForm />));
  };
  const deleteUserHandle = (user) => {
    if (confirm("Are you sure?")) {
      dispatch(deleteUser(user));
    }
  };
  const editUserHandle = (user) => {
    dispatch(setModal(<EditUserForm user={user} />));
  };
  return (
    <UserListContainer>
      <Button onClick={() => dispatch(getAllUsers())}>Get Users</Button>
      <Table dark hover>
        <thead>
          <tr>
            <th />
            <th />
            <th>Online</th>
            <th>Full Name</th>
            <th>Username</th>
            <th>E-Mail</th>
            <th>Phone</th>
            <th>Role</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <th scope="row">{index + 1}</th>
              <td>
                <Avatar avatar={user.avatar} />
              </td>
              <td>
                <Box online={user.online} />
              </td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <Badge color={user.role === "admin" ? "primary" : "warning"}>
                  {user.role}
                </Badge>
              </td>
              <Td>
                <TdItem>
                  <BiEdit
                    onClick={() => editUserHandle(user)}
                    style={{ fontSize: "20px" }}
                  />
                </TdItem>
                <TdItem onClick={() => deleteUserHandle(user)}>
                  <VscTrash style={{ fontSize: "20px" }} />
                </TdItem>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button color="primary" onClick={addUserHandle} style={{ width: "5%" }}>
        <AiOutlineUserAdd style={{ fontSize: "4vh" }} />
      </Button>
    </UserListContainer>
  );
}
