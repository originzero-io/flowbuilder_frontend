import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import { logOut } from "../../../../store/reducers/authReducer";
import useAuth from "../../../../utils/useAuth";
import Avatar from "../../../global/Avatar";
import { Logo } from "../../../global/icons";
import { VerticalDivider } from "../../../style-components/Divider";
import {
  DropdownItem,
  DropdownWrapper,
} from "../../../style-components/DropdownMenu";
import {
  Container,
  ProfileList,
  MenuItem,
  LeftSideContainer,
  RightSideContainer,
  UserInformation,
  Profile,
} from "./style";
export default function TopMenu() {
  const dispatch = useDispatch();
  const { url } = useRouteMatch();
  const { role, avatar,name } = useAuth();
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
          <Profile>
            <Avatar avatar={avatar} size={36}/>
            <UserInformation>
              <div>{name}</div>
              <div style={{textAlign:'center',opacity:'0.6'}}>{role}</div>
            </UserInformation>
          </Profile>
          <ProfileList>
            <DropdownItem>User settings</DropdownItem>
            <DropdownItem onClick={logOutHandle}>Log out</DropdownItem>
          </ProfileList>
        </DropdownWrapper>
      </RightSideContainer>
    </Container>
  );
}
