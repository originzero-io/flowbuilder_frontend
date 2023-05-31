import React, { useState } from "react";
import { Button, Form } from "reactstrap";
import * as Styled from "./NodeConfigMenu.style";

export default function StateHandlesForm({ node, dispatcher }) {
  const { stateHandles } = node.data.skeleton;
  const { inputs, outputs } = stateHandles;
  const [showTrigForm, setShowTrigForm] = useState(false);
  const onChangeNodeInputsHandler = (event) => {
    dispatcher({ type: "updateInputStateHandles", event });
  };
  const onChangeNodeOutputsHandler = (event) => {
    dispatcher({ type: "updateOutputStateHandles", event });
  };
  const addNewTrigHandler = (event) => {
    event.preventDefault();
    const trigName = prompt("Enter trig name: ");
    console.log("trig name: ", trigName);
  };
  return (
    <Form style={Styled.FormStyle}>
      <Styled.SectionName>State Handles:</Styled.SectionName>
      <div style={{ color: "aqua" }}>Inputs: </div>
      {Object.entries(inputs).map((input) => (
        <NodeInput name={input[0]} key={input[0]}>
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
            Object.entries(outputs).map((output) => (
              <NodeInput name={output[0]} key={output[0]}>
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
      <div>
        <Button
          size="sm"
          color="success"
          style={{ marginTop: "15px" }}
          onClick={addNewTrigHandler}
        >
          Add new trig
        </Button>
      </div>
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
