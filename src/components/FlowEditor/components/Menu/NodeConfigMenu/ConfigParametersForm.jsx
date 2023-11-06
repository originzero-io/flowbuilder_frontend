import React from "react";
import { Col, Form, FormGroup, Input, Label } from "reactstrap";
import * as Styled from "./NodeConfigMenu.style";

export default function ConfigParametersForm({ node, dispatcher }) {
  const { configParameters } = node.data;
  const parameterEntries = Object.entries(configParameters);

  const onChangeConfigParametersHandler = (event, inputType) => {
    console.log(inputType);
    if (inputType === "number") {
      event.target.value = parseInt(event.target.value, 10);
      console.log("targetValue: ", event.target.value);
    }
    dispatcher({ type: "updateConfigParameters", payload: event });
  };

  return (
    <Form style={Styled.FormStyle}>
      <Styled.SectionName>Parameters:</Styled.SectionName>
      {parameterEntries.map((entry, index) => (
        <FormGroup row key={index}>
          <Label sm={6}>{entry[0]} : </Label>
          <Col sm={6}>
            <Input
              id={entry[0]}
              name={entry[0]}
              placeholder={entry[1]}
              type={typeof entry[1]}
              defaultValue={entry[1]}
              onChange={(event) =>
                onChangeConfigParametersHandler(event, typeof entry[1])
              }
            />
          </Col>
        </FormGroup>
      ))}
    </Form>
  );
}
