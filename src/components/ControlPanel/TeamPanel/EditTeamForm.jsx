import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { editTeam } from "../../../store/actions/teamActions";
import { editTeamService } from "../../../services/teamService";
import { setError } from "../../../store/actions/errorActions";
import { setModal } from "../../../store/actions/componentActions";
export default function EditTeamForm() {
  const { activeTeam } = useSelector((state) => state.teams);
  const [teamInfo, setteamInfo] = useState({
    name: null,
  });
  const dispatch = useDispatch();
  const onChangeHandler = (e) => {
    setteamInfo({ ...teamInfo, [e.target.name]: e.target.value });
  };
  const onSubmitHandle = (e) => {
    e.preventDefault();
    editTeamService(activeTeam._id, teamInfo)
      .then((res) => {
        dispatch(editTeam(res.team));
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
