import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button, Form } from "reactstrap";
import { moveFlowService } from "../../../../../services/flowService";
import { setModal } from "../../../../../store/actions/componentActions";
import { setError } from "../../../../../store/actions/errorActions";
import { updateFlow } from "../../../../../store/actions/flowActions";

export default function MoveFlow({ flow }) {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projectReducer);
  const [selection, setSelection] = useState(flow.project);
  const changeHandle = (e) => {
    setSelection(e.target.value);
  };

  const submitHandle = (e) => {
    e.preventDefault();
    console.log(selection);
    console.log(flow);
    moveFlowService(flow._id, selection)
      .then((res) => {
        dispatch(updateFlow(res.flow));
        dispatch(setModal(false));
      })
      .catch((err) => dispatch(setError(err)));
  };
  return (
    <Form onSubmit={submitHandle}>
      <div style={{ marginBottom: "10px" }}>Select Project</div>
      <Input type="select" onChange={changeHandle} value={selection}>
        {projects.map((project) => {
          return (
            <option key={project._id} value={project._id}>
              {project.name}
            </option>
          );
        })}
      </Input>
      <Button style={{ marginTop: "10px" }} color="primary" type="submit">
        Move
      </Button>
    </Form>
  );
}
