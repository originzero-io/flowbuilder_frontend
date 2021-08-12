import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "reactstrap";
import { deleteTeamService } from "../../../../services/teamService";
import { logOut } from "../../../../store/actions/authActions";
import { deleteTeam } from "../../../../store/actions/teamActions";
import {
  DropDownItem,
  DropdownWrapper,
} from "../../../style-components/DropdownMenu";
import { Container, SearchBar, ProfileWrapper, ProfileList } from "./style";
export default function TopMenu() {
  const dispatch = useDispatch();
  const { activeTeam } = useSelector((state) => state.teamReducer);
  const { name } = useSelector((state) => state.authReducer);
  const deleteTeamHandler = async () => {
    if (confirm(`${activeTeam.name} takımını silmek istiyor musunuz?`)) {
      try {
        const data = await deleteTeamService(activeTeam._id);
        dispatch(deleteTeam(data.team._id));
        console.log("data:", data);
      } catch (error) {
        console.log("error");
      }
    }
  };
  const logOutHandle = () => {
    dispatch(logOut());
  };
  return (
    <Container>
      <Button color="danger" onClick={deleteTeamHandler}>
        Delete Team
      </Button>
      <SearchBar placeholder="Search flows" spellCheck={false} />
      <DropdownWrapper tabIndex="1">
        <ProfileWrapper>
          <div style={{ fontSize: "10px" }}>{name.split(" ")[0]}</div>
        </ProfileWrapper>
        <ProfileList>
          <DropDownItem>User settings</DropDownItem>
          <DropDownItem onClick={logOutHandle}>Log out</DropDownItem>
        </ProfileList>
      </DropdownWrapper>
    </Container>
  );
}
