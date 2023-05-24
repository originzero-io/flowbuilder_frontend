import Avatar from "components/Shared/Avatar/Avatar";
import { Logo } from "components/Shared/icons";
import useAuth from "utils/hooks/useAuth";
import React from "react";
import { BiBrain } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import { logOut } from "store/reducers/authSlice";
import * as GlobalStyled from "components/StyledComponents/DropdownMenu";
import userEvent from "services/configurationService/userService/userService.event";
import workspaceEvent from "services/configurationService/workspaceService/workspaceService.event";
import projectEvent from "services/configurationService/projectService/projectService.event";
import flowEvent from "services/configurationService/flowService/flowService.event";
import noteEvent from "services/configurationService/noteService/noteService.event";
import flowElementEvent from "services/configurationService/flowElementService/flowElementService.event";
import AuthService from "services/authService/authService";
import * as Styled from "./TopMenu.style";

export default function TopMenu() {
  const dispatch = useDispatch();
  const { url } = useRouteMatch();
  const { role, avatar, name } = useAuth();
  const logOutHandle = () => {
    if (confirm("Sure?")) {
      dispatch(logOut());
      AuthService.logOut();
      userEvent.disconnect();
      workspaceEvent.disconnect();
      projectEvent.disconnect();
      flowEvent.disconnect();
      noteEvent.disconnect();
      flowElementEvent.disconnect();
    }
  };
  return (
    <Styled.Container>
      <Styled.LeftSideContainer>
        <Logo theme="dark" />
      </Styled.LeftSideContainer>
      <Styled.RightSideContainer>
        <Link to={`${url}/learn`}>
          <Styled.MenuItem>
            <BiBrain />
            <span style={{ marginLeft: "5px" }}>Learn</span>
          </Styled.MenuItem>
        </Link>
        {role === "admin" && (
          <Link to={`${url}/users`}>
            <Styled.MenuItem>
              <FiUsers />
              <span style={{ marginLeft: "5px" }}>Users</span>
            </Styled.MenuItem>
          </Link>
        )}
        <GlobalStyled.DropdownWrapper tabIndex="1">
          <Styled.Profile>
            <Avatar avatar={avatar} size={36} />
            <Styled.UserInformation>
              <div>{name}</div>
              <div style={{ textAlign: "center", opacity: "0.6" }}>{role}</div>
            </Styled.UserInformation>
          </Styled.Profile>
          <Styled.ProfileList>
            <Link to={`${url}/settings`}>
              <GlobalStyled.DropdownItem style={{ color: "white" }}>
                User settings
              </GlobalStyled.DropdownItem>
            </Link>
            <GlobalStyled.DropdownItem onClick={logOutHandle}>
              Log out
            </GlobalStyled.DropdownItem>
          </Styled.ProfileList>
        </GlobalStyled.DropdownWrapper>
      </Styled.RightSideContainer>
    </Styled.Container>
  );
}
