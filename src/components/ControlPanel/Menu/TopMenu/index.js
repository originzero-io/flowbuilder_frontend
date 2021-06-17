import React from "react";
import { Link } from "react-router-dom";
import fullLogo from "../../../../assets/images/full-logo.png";
import { ProfileIcon } from "../../../FlowEditor/Menu/NavMenu/Icons";
import { DropDownItem, DropdownList, DropdownWrapper } from "../../../style-components/DropdownMenu";
import { Container, SearchBar, ProfileWrapper,LeftSideContainer } from "./style";
export default function TopMenu() {
  return (
    <Container>
      <LeftSideContainer>
        <Link to="/">
          <img src={fullLogo} alt="logo" width="100px" />
        </Link>
        <SearchBar placeholder="Search flows" spellCheck={false} />
      </LeftSideContainer>
      <DropdownWrapper>
        <ProfileWrapper tabIndex="1">
          <ProfileIcon
            width="40px"
            height="40px"
          />
        </ProfileWrapper>
        <DropdownList align="right">
          <DropDownItem>User settings</DropDownItem>
          <DropDownItem>User settings</DropDownItem>
          <DropDownItem>User settings</DropDownItem>
        </DropdownList>
      </DropdownWrapper>
    </Container>
  );
}
