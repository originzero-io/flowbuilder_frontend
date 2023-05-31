import React from "react";
import { Badge, Form } from "reactstrap";
import * as Styled from "./NodeConfigMenu.style";

export default function FrozenHandlesForm({ node, dispatcher }) {
  const { frozenHandles, skeleton } = node.data;
  const { outputValues } = skeleton;

  const onCheckFrozenHandleHandler = (event) => {
    if (event.target.checked) {
      dispatcher({ type: "freezeHandle", payload: event });
    } else {
      dispatcher({ type: "unFreezeHandle", payload: event });
    }
  };
  return (
    <Form style={Styled.FormStyle}>
      <Styled.SectionName>Frozen Handles:</Styled.SectionName>
      {outputValues &&
        Object.entries(outputValues).map((output) => {
          return (
            <div
              key={output}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex" }}>
                <div>{output[0]}</div>
                <Badge style={{ marginLeft: "10px" }}> {output[1]}</Badge>
              </div>
              <input
                type="checkbox"
                name={output[0]}
                checked={frozenHandles.includes(output[0])}
                onChange={onCheckFrozenHandleHandler}
              />
            </div>
          );
        })}
    </Form>
  );
}
