import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Badge, Button, Table } from "reactstrap";
import styled from "styled-components";
import { setModal } from "../../../../store/reducers/componentReducer";
import useUser from "../../../../utils/useUser";
import useWorkspace from "../../../../utils/useWorkspace";
import Avatar from "../../../global/Avatar";
import PermissionPage from "./PermissionPage";
import { Button as AntdButton } from "antd";
const TBody = styled.tbody`
  &:hover {
    background-color: rgba(46, 213, 115, 0.2);
    transition: background-color 0.2s ease-in-out;
  }
`;
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
  const members = users.filter(({workspaces}) => workspaces.some((workspace) => workspace._id === activeWorkspace._id));
  const permissionHandle = (member) => {
    dispatch(setModal(<PermissionPage member={member}/>));
  }
  return (
    <div>
      <Button color="success">Denedim olmadı</Button>
      <AntdButton type="primary">Denedim olmadı</AntdButton>
      <Badge color="warning">dasda</Badge>
      <Table style={{ color: "white", background: "#1C1F26" }}>
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
        {members.map((member, index) => {
          return (
            <TBody key={member._id} style={{ cursor: "pointer" }}>
                <th>{index + 1}</th>
                <th>
                  <Avatar avatar={member.avatar}/>
                </th>
                <td>
                  <Box online={member.online} />
                </td>
                <td>{member.name}</td>
                <td>{member.username}</td>
                <td>{member.email}</td>
                <td>{member.phone}</td>
                <td>
                  <Badge color="warning" style={{fontSize:'1.3vmin'}} onClick={()=>permissionHandle(member)}>
                    Manage Permissions
                  </Badge>
              </td>
              </TBody>
          );
        })}
      </Table>
    </div>
  );
}
