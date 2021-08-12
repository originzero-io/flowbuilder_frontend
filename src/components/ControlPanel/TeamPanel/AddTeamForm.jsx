import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, FormGroup, Input } from 'reactstrap';
import uuid from "react-uuid"
import { createTeam } from "../../../store/actions/teamActions";
import { createTeamService } from "../../../services/teamService";
import {openNotification as notification} from "../../../app-global/dom/notification"
import { setError } from "../../../store/actions/errorActions";
export default function AddTeamForm({ closeModal }) {
  const auth = useSelector((state) => state.authReducer);
  const [teamInfo, setteamInfo] = useState({
    name: null,
    createdUser:auth._id
  });
  const dispatch = useDispatch();
  const onChangeHandler = (e) => {
    setteamInfo({ ...teamInfo, [e.target.name]: e.target.value });
  };
  const onSubmitHandle = async(e) => {
    e.preventDefault();
    try {
      const data = await createTeamService(teamInfo);
      console.log("data:", data);
      dispatch(createTeam(data.team));
      closeModal();
    } catch (error) {
      dispatch(setError(error));
    }
  };
  return (
    <Form onSubmit={onSubmitHandle}>
      <FormGroup>
        <Input name="name" placeholder="Team name" onChange={onChangeHandler} required/>
      </FormGroup>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
