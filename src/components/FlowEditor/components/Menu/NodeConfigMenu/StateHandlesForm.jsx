import React from "react";
import { Form } from "reactstrap";
import * as Styled from "./NodeConfigMenu.style";

export default function StateHandlesForm({ node, dispatcher }) {
  const { stateHandles } = node.data.handles.handleMechanism;
  const onChangeNodeInputsHandler = (event) => {
    dispatcher({ type: "updateStateHandles", event });
  };
  return (
    <Form style={Styled.FormStyle}>
      <Styled.SectionName>State Handles:</Styled.SectionName>
      <NodeInput name="enable">
        <input
          type="checkbox"
          name="enable"
          checked={stateHandles.enable}
          onChange={onChangeNodeInputsHandler}
        />
      </NodeInput>
      <NodeInput name="disable">
        <input
          type="checkbox"
          name="disable"
          checked={stateHandles.disable}
          onChange={onChangeNodeInputsHandler}
        />
      </NodeInput>
      <NodeInput name="trig">
        <input
          type="checkbox"
          name="trig"
          checked={stateHandles.trig}
          onChange={onChangeNodeInputsHandler}
        />
      </NodeInput>
      <NodeInput name="start">
        <input
          type="checkbox"
          name="start"
          checked={stateHandles.start}
          onChange={onChangeNodeInputsHandler}
        />
      </NodeInput>
      <NodeInput name="end">
        <input
          type="checkbox"
          name="end"
          checked={stateHandles.end}
          onChange={onChangeNodeInputsHandler}
        />
      </NodeInput>
      <NodeInput name="error">
        <input
          type="checkbox"
          name="error"
          checked={stateHandles.error}
          onChange={onChangeNodeInputsHandler}
        />
      </NodeInput>
      <NodeInput name="cancel">
        <input
          type="checkbox"
          name="cancel"
          checked={stateHandles.cancel}
          onChange={onChangeNodeInputsHandler}
        />
      </NodeInput>
      <NodeInput name="clear">
        <input
          type="checkbox"
          name="clear"
          checked={stateHandles.clear}
          onChange={onChangeNodeInputsHandler}
        />
      </NodeInput>
    </Form>
  );
}

function NodeInput({ children, name }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        marginTop: "10px",
      }}
    >
      <div style={{ color: "whitesmoke" }}>{name}</div>
      {children}
    </div>
  );
}
