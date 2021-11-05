import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../../../store/actions/authActions";
import {
  DropDownItem,
  DropdownWrapper,
} from "../../../style-components/DropdownMenu";
import { Container, SearchBar, ProfileWrapper, ProfileList } from "./style";
export default function TopMenu() {
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.auth);
  const logOutHandle = () => {
    if (confirm("Sure?")) {
      dispatch(logOut());
    }
  };
  return (
    <Container>
      {/* <SearchBar placeholder="Search flows" spellCheck={false} /> */}
      <DropdownWrapper tabIndex="1">
        <ProfileWrapper>
          <div style={{ fontSize: "20px" }}>{username[0].toUpperCase()}</div>
        </ProfileWrapper>
        <ProfileList>
          <DropDownItem>User settings</DropDownItem>
          <DropDownItem onClick={logOutHandle}>Log out</DropDownItem>
        </ProfileList>
      </DropdownWrapper>
    </Container>
  );
}
