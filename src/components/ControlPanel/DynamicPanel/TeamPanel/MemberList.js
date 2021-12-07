import React from "react";
import { Badge, Table } from "reactstrap";
import styled from "styled-components";
import useUser from "../../../../utils/useUser";
import useWorkspace from "../../../../utils/useWorkspace";
import Avatar from "../../../global/Avatar";
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
  background: ${(props) => (props.online ? "#4cd137" : "#c0392b")};
  border-radius: 50%;
`;
export default function MemberList() {
  const users = useUser();
  const { activeWorkspace } = useWorkspace();
  const members = users.filter((user) =>
    user.workspaces.includes(activeWorkspace._id)
  );
  const deleteUserHandle = (user) => {
    if (confirm("Are you sure?")) {
      //dispatch(deleteUser(user));
    }
  };
  const editUserHandle = (user) => {
    //dispatch(setModal(<EditUserForm user={user} />));
  };
  return (
    <div>
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
            <th>Role</th>
            <th></th>
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
                <Badge color={member.role === "admin" ? "primary" : "warning"}>
                  {member.role}
                </Badge>
              </td>
              <Td>
                {/* <TdItem>
                  <BiEdit
                    onClick={() => editUserHandle(member)}
                    style={{ fontSize: "20px" }}
                  />
                </TdItem>
                <TdItem onClick={() => deleteUserHandle(member)}>
                  <VscTrash style={{ fontSize: "20px" }} />
                </TdItem> */}
              </Td>
            </TBody>
          );
        })}
      </Table>
    </div>
  );
}
