import React from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import * as Styled from "./NodeConfigMenu.style";
import notificationHelper from "utils/ui/notificationHelper";

export default function TriggerForm({ node, dispatcher }) {
  return (
    <Form style={Styled.FormStyle}>
      <TriggerInputHandleForm node={node} dispatcher={dispatcher} />
      <TriggerAttributeForm node={node} dispatcher={dispatcher} />
    </Form>
  );
}

function TriggerInputHandleForm({ node, dispatcher }) {
  const { trigHandles } = node.data;

  const onChangeTriggerInputActiveHandler = (event) => {
    dispatcher({ type: "updateTriggerHandles", payload: event });
  };

  const addNewTrigHandler = (event) => {
    event.preventDefault();

    const trigName = prompt("Enter trig name: ");
    const currentTrigHandles = Object.keys(trigHandles);

    if (currentTrigHandles.includes(trigName)) {
      notificationHelper.warn("There are already trig in that name.");
    } else {
      dispatcher({ type: "addTriggerHandle", payload: trigName });
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <Styled.SectionName>Trigger Handles:</Styled.SectionName>
      {trigHandles &&
        Object.entries(trigHandles).map((trigHandle) => {
          return (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>{trigHandle[0]}</div>
              <input
                type="checkbox"
                name={trigHandle[0]}
                defaultChecked={trigHandle[1]}
                checked={trigHandle[1]}
                onChange={onChangeTriggerInputActiveHandler}
              />
            </div>
          );
        })}
      <Button
        size="sm"
        color="success"
        style={{ marginTop: "15px" }}
        onClick={addNewTrigHandler}
      >
        Add trig handle
      </Button>
    </div>
  );
}

function TriggerAttributeForm({ node, dispatcher }) {
  const { triggerAttributes } = node.data;

  const onChangeTriggerAttributesHandler = (event) => {
    dispatcher({ type: "updateTriggerAttributes", payload: event });
  };

  return (
    <div>
      <Styled.SectionName>Trigger Attributes:</Styled.SectionName>
      <FormGroup>
        <Input
          type="select"
          onChange={onChangeTriggerAttributesHandler}
          defaultValue={triggerAttributes}
        >
          <option>Restart operation</option>
          <option>Queue</option>
          <option>Ignore</option>
        </Input>
      </FormGroup>
    </div>
  );
}
