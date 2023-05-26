import React from "react";
import { Form, FormGroup, Input } from "reactstrap";
import * as Styled from "./NodeConfigMenu.style";

export default function TriggerAttributeForm({ node, dispatcher }) {
  const { triggerAttributes } = node.data.handles;

  const onChangeTriggerAttributesHandler = (event) => {
    dispatcher({ type: "updateTriggerAttributes", event });
  };

  return (
    <Form style={Styled.FormStyle}>
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
    </Form>
  );
}
