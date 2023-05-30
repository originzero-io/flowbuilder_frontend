import React from "react";
import { Button, Form } from "reactstrap";
import * as Styled from "./NodeConfigMenu.style";

export default function StateHandlesForm({ node, dispatcher }) {
  const { stateHandles } = node.data.skeleton;
  const { inputs, outputs } = stateHandles;

  const onChangeNodeInputsHandler = (event) => {
    dispatcher({ type: "updateInputStateHandles", event });
  };
  const onChangeNodeOutputsHandler = (event) => {
    dispatcher({ type: "updateOutputStateHandles", event });
  };
  return (
    <Form style={Styled.FormStyle}>
      <Styled.SectionName>State Handles:</Styled.SectionName>
      <div style={{ color: "aqua" }}>Inputs: </div>
      {Object.entries(inputs).map((input, index) => (
        <NodeInput name={input[0]} key={index[0]}>
          <input
            type="checkbox"
            name={input[0]}
            checked={input[1]}
            onChange={onChangeNodeInputsHandler}
          />
        </NodeInput>
      ))}
      {outputs && (
        <>
          <div style={{ color: "aqua" }}>Outputs: </div>
          {outputs &&
            Object.entries(outputs).map((output, index) => (
              <NodeInput name={output[0]} key={index[0]}>
                <input
                  type="checkbox"
                  name={output[0]}
                  checked={output[1]}
                  onChange={onChangeNodeOutputsHandler}
                />
              </NodeInput>
            ))}
        </>
      )}
      <Button size="sm" color="success" style={{ marginTop: "15px" }}>
        Add new trig
      </Button>
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
