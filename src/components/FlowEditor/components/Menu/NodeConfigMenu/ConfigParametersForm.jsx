import React from "react";
import { Col, Form, FormGroup, Input, Label } from "reactstrap";
import * as Styled from "./NodeConfigMenu.style";

export default function ConfigParametersForm({ node, dispatcher }) {
  // const { skeleton } = self.data;
  const { skeleton } = node.data;
  const configParameter = skeleton.configParameters;
  const parameterEntries = Object.entries(configParameter);

  const onChangeConfigParametersHandler = (event) => {
    dispatcher({ type: "updateConfigParameters", event });
  };

  return (
    <Form style={Styled.FormStyle}>
      <Styled.SectionName>Parameters:</Styled.SectionName>
      {parameterEntries.map((entry, index) => {
        return (
          <FormGroup row key={index}>
            <Label sm={6}>{entry[0]} : </Label>
            <Col sm={6}>
              <Input
                id={entry[0]}
                name={entry[0]}
                placeholder={entry[1]}
                type={typeof entry[1]}
                defaultValue={entry[1]}
                onChange={onChangeConfigParametersHandler}
              />
            </Col>
          </FormGroup>
        );
      })}
    </Form>
  );
}
