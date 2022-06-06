import Avatar from "components/Shared/Avatar";
import { Logo } from "components/Shared/icons";
import useAuth from "hooks/useAuth";
import React from "react";
import { BiBrain } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import { logOut } from "store/reducers/authSlice";
import {
  DropdownItem,
  DropdownWrapper
} from "components/StyledComponents/DropdownMenu";
import {
  Container, LeftSideContainer, MenuItem, Profile, ProfileList, RightSideContainer,
  UserInformation
} from "./TopMenu.style";
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
        <Link to={`${url}/learn`}>
          <MenuItem><BiBrain /><span style={{marginLeft:'5px'}}>Learn</span></MenuItem>
        </Link>
        {role === "admin" && (
          <Link to={`${url}/users`}>
              <MenuItem><FiUsers/><span style={{marginLeft:'5px'}}>Users</span></MenuItem>
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
            <Link to={`${url}/settings`}>
              <DropdownItem style={{color:'white'}}>User settings</DropdownItem>
            </Link>
            <DropdownItem onClick={logOutHandle}>Log out</DropdownItem>
          </ProfileList>
        </DropdownWrapper>
      </RightSideContainer>
    </Container>
  );
}
