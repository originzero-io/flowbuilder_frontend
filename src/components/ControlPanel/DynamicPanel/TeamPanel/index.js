import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";
import { setModal } from "../../../../store/reducers/componentReducer";
import { getAllUsers } from "../../../../store/reducers/userReducer";
import { DynamicPanelContainer } from "../style";
import AddMemberForm from "./AddMemberForm";
import MemberList from "./MemberList";

export default function TeamPanel() {
    const dispatch = useDispatch();
    const addMemberToTeamHandle = () => {
        dispatch(setModal(<AddMemberForm />));
  };
    const refreshHandle = () => {
        dispatch(getAllUsers());
  };
  return (
    <DynamicPanelContainer>
      <Button color="primary" onClick={addMemberToTeamHandle}>Add Member to Team</Button>
      <Button color="warning" onClick={refreshHandle}>Refresh</Button>
      <MemberList />
    </DynamicPanelContainer>
  );
}
