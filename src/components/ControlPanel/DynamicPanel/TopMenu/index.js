import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useRouteMatch } from "react-router-dom";
import { Button } from "reactstrap";
import { logOut } from "../../../../store/reducers/authReducer";
import {
  DropDownItem,
  DropdownWrapper,
} from "../../../style-components/DropdownMenu";
import {
  Container,
  SearchBar,
  ProfileWrapper,
  ProfileList,
  MenuItem
} from "./style";
export default function TopMenu() {
  const dispatch = useDispatch();
  const { url } = useRouteMatch();

  const { username,role } = useSelector((state) => state.auth);
  const logOutHandle = () => {
    if (confirm("Sure?")) {
      dispatch(logOut());
    }
  };
  return (
    <Container>
      <SearchBar placeholder="Search flows" spellCheck={false} />
        {
          role === "admin" && (
            <Link to={`${url}/users`}>
              <MenuItem>Users</MenuItem>
            </Link>
          )
        }
        <DropdownWrapper tabIndex="1">
          {/* <ProfileWrapper>
            <div style={{ fontSize: "20px" }}>{username[0].toUpperCase()}</div>
          </ProfileWrapper> */}
            <MenuItem>Profile</MenuItem>
          <ProfileList>
            <DropDownItem>User settings</DropDownItem>
            <DropDownItem onClick={logOutHandle}>Log out</DropDownItem>
          </ProfileList>
        </DropdownWrapper>
    </Container>
  );
}
