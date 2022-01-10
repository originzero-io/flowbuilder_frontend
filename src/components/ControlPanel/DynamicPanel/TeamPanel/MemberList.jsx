import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Badge, Button, Table } from "reactstrap";
import styled from "styled-components";
import { setModal } from "../../../../store/reducers/componentReducer";
import useUser from "../../../../utils/useUser";
import useWorkspace from "../../../../utils/useWorkspace";
import Avatar from "../../../global/Avatar";
import PermissionPage from "./PermissionPage";
const Box = styled.div`
  margin-top: 3px;
  cursor: pointer;
  width: 25px;
  height: 25px;
  background: ${(props) => (props.online ? "#4cd137" : "#95a5a6")};
  border-radius: 50%;
`;
export default function MemberList() {
  const dispatch = useDispatch();
  const users = useUser();
  const { activeWorkspace } = useWorkspace();
  const members = users.filter(({ workspaces }) =>
    workspaces.some((workspace) => workspace?._id === activeWorkspace._id)
  );
  const permissionHandle = (member) => {
    dispatch(setModal(<PermissionPage member={member} />));
  };
  return (
    <>
      <Table dark hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Avatar</th>
            <th>Online</th>
            <th>Full Name</th>
            <th>Username</th>
            <th>E-Mail</th>
            <th>Phone</th>
            <th>Permissions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => {
            return (
              <tr key={member._id}>
                <th scope="row">{index + 1}</th>
                <td>
                  <Avatar avatar={member.avatar} />
                </td>
                <td>
                  <Box online={member.online} />
                </td>
                <td>{member.name}</td>
                <td>{member.username}</td>
                <td>{member.email}</td>
                <td>{member.phone}</td>
                <td>
                  <Button
                    color="warning"
                    style={{ fontSize: "1.2vmin" }}
                    onClick={() => permissionHandle(member)}
                  >
                    Manage Permissions
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
