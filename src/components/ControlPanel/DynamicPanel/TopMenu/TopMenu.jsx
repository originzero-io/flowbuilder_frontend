import Avatar from "components/Shared/Avatar/Avatar";
import * as GlobalStyled from "components/StyledComponents/DropdownMenu";
import { BiBrain } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import AuthService from "services/authService/authService";
import { logOut } from "store/reducers/authSlice";
import useAuth from "utils/hooks/useAuth";
import CompanyLogo from "components/Shared/CompanyLogo";
import * as Styled from "./TopMenu.style";

export default function TopMenu() {
  const dispatch = useDispatch();
  const { url } = useRouteMatch();
  const { role, avatar, name } = useAuth();
  const logOutHandle = () => {
    if (confirm("Sure?")) {
      dispatch(logOut());
      AuthService.logOut();
    }
  };
  return (
    <Styled.Container>
      <Styled.LeftSideContainer>
        <CompanyLogo size={40} />
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
