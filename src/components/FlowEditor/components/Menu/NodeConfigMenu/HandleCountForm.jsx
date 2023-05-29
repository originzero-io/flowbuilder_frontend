/* eslint-disable no-nested-ternary */
import React from "react";
import { useDispatch } from "react-redux";
import { updateNodeHandles } from "store/reducers/flow/flowElementsSlice";
import { Form, FormGroup, Input } from "reactstrap";
import * as Styled from "./NodeConfigMenu.style";

export default function DynamicHandlesForm({ node, dispatcher }) {
  const { ioType, targetCount, sourceCount } = node.data.skeleton.ioEngine;
  const dispatch = useDispatch();
  const handleCountChange = (event) => {
    dispatcher({ type: "updateHandleCount", event });
  };
  return (
    <Form style={Styled.FormStyle}>
      <Styled.SectionName>Value Handle Count:</Styled.SectionName>
      {ioType === "both" ? (
        <>
          <div>Target Length</div>
          <Input
            type="number"
            name="targetCount"
            min={1}
            className="nodrag nowheel"
            value={targetCount}
            onChange={handleCountChange}
          />
          <div>Source Length</div>
          <Input
            type="number"
            name="sourceCount"
            min={1}
            className="nodrag nowheel"
            value={sourceCount}
            onChange={handleCountChange}
          />
        </>
      ) : ioType === "target" ? (
        <>
          <div>Target Length</div>
          <Input
            type="number"
            name="targetCount"
            min={1}
            className="nodrag nowheel"
            value={targetCount}
            onChange={handleCountChange}
          />
        </>
      ) : (
        ioType === "source" && (
          <>
            <div>Source Length</div>
            <Input
              type="number"
              name="sourceCount"
              min={1}
              className="nodrag nowheel"
              value={sourceCount}
              onChange={handleCountChange}
            />
          </>
        )
      )}
    </Form>
  );
}
