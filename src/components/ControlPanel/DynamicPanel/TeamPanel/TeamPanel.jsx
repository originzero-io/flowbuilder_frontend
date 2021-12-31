import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";
import { setModal } from "../../../../store/reducers/componentReducer";
import { getAllUsers } from "../../../../store/reducers/userReducer";
import AddMemberForm from "./AddMemberForm.jsx";
import MemberList from "./MemberList.jsx";

export default function TeamPanel() {
    const dispatch = useDispatch();
    const addMemberToTeamHandle = () => {
        dispatch(setModal(<AddMemberForm />));
  };
    const refreshHandle = () => {
        dispatch(getAllUsers());
  };
  return (
    <>
      <Button color="primary" onClick={addMemberToTeamHandle} style={{marginBottom:'5px'}}>Manage Members</Button>
      <Button color="warning" onClick={refreshHandle} style={{marginLeft:'10px',marginBottom:'5px'}}>Refresh</Button>
      <MemberList />
    </>
  );
}
