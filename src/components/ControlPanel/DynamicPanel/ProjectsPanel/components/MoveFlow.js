import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button, Form } from "reactstrap";
import { setModal } from "../../../../../store/reducers/componentReducer";
import { moveFlow } from "../../../../../store/reducers/flow/flowReducer";

export default function MoveFlow({ flow }) {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projects);
  const [selection, setSelection] = useState(flow.project);
  const changeHandle = (e) => {
    setSelection(e.target.value);
  };

  const submitHandle = (e) => {
    e.preventDefault();
    dispatch(moveFlow(flow,selection));
    dispatch(setModal(false));
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
