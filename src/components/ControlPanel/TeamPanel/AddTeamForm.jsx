import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { createTeam } from "../../../store/actions/teamActions";
import { createTeamService } from "../../../services/teamService";
import { setError } from "../../../store/actions/errorActions";
import { setModal } from "../../../store/actions/componentActions";
export default function AddTeamForm() {
  const auth = useSelector((state) => state.authReducer);
  const [teamInfo, setteamInfo] = useState({
    name: null,
    createdBy: auth.username,
  });
  const dispatch = useDispatch();
  const onChangeHandler = (e) => {
    setteamInfo({ ...teamInfo, [e.target.name]: e.target.value });
  };
  const onSubmitHandle = (e) => {
    e.preventDefault();
    createTeamService(teamInfo)
      .then((res) => {
        dispatch(createTeam(res.team));
        dispatch(setModal(false));
      })
      .catch((err) => dispatch(setError(err)));
  };
  return (
    <Form onSubmit={onSubmitHandle}>
      <FormGroup>
        <Input
          name="name"
          placeholder="Team name"
          onChange={onChangeHandler}
          required
        />
      </FormGroup>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
