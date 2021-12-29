import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import { logOut } from "../../../../store/reducers/authReducer";
import useAuth from "../../../../utils/useAuth";
import Avatar from "../../../global/Avatar";
import { Logo } from "../../../global/icons";
import {
  DropDownItem,
  DropdownWrapper,
} from "../../../style-components/DropdownMenu";
import {
  Container,
  ProfileList,
  MenuItem,
  LeftSideContainer,
  RightSideContainer,
} from "./style";
export default function TopMenu() {
  const dispatch = useDispatch();
  const { url } = useRouteMatch();
  const { role, avatar } = useAuth();
  const logOutHandle = () => {
    if (confirm("Sure?")) {
      dispatch(logOut());
    }
  };
  return (
    <Container>
      <LeftSideContainer>
        <Logo theme="dark" />
      </LeftSideContainer>
      <RightSideContainer>
        {role === "admin" && (
          <Link to={`${url}/users`}>
            <MenuItem>Users</MenuItem>
          </Link>
        )}
        <DropdownWrapper tabIndex="1">
          <div style={{ cursor: "pointer" }}>
            <Avatar avatar={avatar}/>
          </div>
          <ProfileList>
            <DropDownItem>User settings</DropDownItem>
            <DropDownItem onClick={logOutHandle}>Log out</DropDownItem>
          </ProfileList>
        </DropdownWrapper>
      </RightSideContainer>
    </Container>
  );
}
