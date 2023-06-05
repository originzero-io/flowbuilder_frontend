import React from "react";
import { Form } from "reactstrap";
import * as Styled from "./NodeConfigMenu.style";

export default function StatusHandlesForm({ node, dispatcher }) {
  const { statusHandles } = node.data;
  const { inputs, outputs } = statusHandles;
  const onChangeNodeInputsHandler = (event) => {
    dispatcher({ type: "updateInputStatusHandles", payload: event });
  };
  const onChangeNodeOutputsHandler = (event) => {
    dispatcher({ type: "updateOutputStatusHandles", payload: event });
  };
  return (
    <Form style={Styled.FormStyle}>
      <Styled.SectionName>Status Handles:</Styled.SectionName>
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
