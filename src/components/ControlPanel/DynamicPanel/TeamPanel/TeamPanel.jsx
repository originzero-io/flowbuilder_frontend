import React from "react";
import { MdOutlineManageAccounts } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";
import { setModal } from "../../../../store/reducers/componentReducer";
import AddMemberForm from "./components/AddMemberForm.jsx";
import MemberList from "./MemberList.jsx";

export default function TeamPanel() {
  const dispatch = useDispatch();
  const addMemberToTeamHandle = () => {
    dispatch(setModal(<AddMemberForm />));
  };
  return (
    <>
      <Button
        color="success"
        onClick={addMemberToTeamHandle}
        style={{ marginBottom: "5px" }}
      >
        <MdOutlineManageAccounts
          style={{ fontSize: "2.5vmin", marginRight: "5px" }}
        />
        Manage Members
      </Button>
      <MemberList />
    </>
  );
}
