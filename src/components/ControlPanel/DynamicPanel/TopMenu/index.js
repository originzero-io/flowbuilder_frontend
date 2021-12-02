import { Avatar } from "antd";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
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
  ProfileWrapper,
  ProfileList,
  MenuItem
} from "./style";
export default function TopMenu() {
  const dispatch = useDispatch();
  const { url } = useRouteMatch();

  const { role,avatar } = useSelector((state) => state.auth);
  const logOutHandle = () => {
    if (confirm("Sure?")) {
      dispatch(logOut());
    }
  };
  return (
    <Container>
        {
          role === "admin" && (
            <Link to={`${url}/users`}>
              <MenuItem>Users</MenuItem>
            </Link>
          )
        }
        <DropdownWrapper tabIndex="1">
        <div style={{cursor:"pointer"}}>
          <Avatar size={40} src={`http://localhost:5000/uploads/${avatar}`} icon={<FaUserCircle style={{fontSize:'48px'}}/>}/>
          
          </div>
          {/* <ProfileWrapper>
          <div style={{ fontSize: "20px" }}>{username[0].toUpperCase()}</div>
          </ProfileWrapper> */}
            {/* <MenuItem>Profile</MenuItem> */}
          <ProfileList>
            <DropDownItem>User settings</DropDownItem>
            <DropDownItem onClick={logOutHandle}>Log out</DropDownItem>
          </ProfileList>
        </DropdownWrapper>
    </Container>
  );
}
