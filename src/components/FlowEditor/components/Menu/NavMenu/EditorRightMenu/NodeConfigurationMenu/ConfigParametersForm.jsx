import { Col, Form, FormGroup, Label } from "reactstrap";
import * as Styled from "./NodeConfigMenu.style";
import styled from "styled-components";
import CalculateNodeConfigParameters from "./SpecialNodes/CalculateNodeConfigParameters";

const InputWrapper = styled.div`
  color: #a8a8a8;
  border-radius: 4px;
`;
const InputStyled = styled.input`
  border-radius: 4px;
  width: 100%;
  padding: 6px;
  padding-left: 10px;
  background-color: #262626;
  border: 1px solid #3a3a3a;
  color: #c1c1c1;
  outline: none;
  &:focus {
    border: 1px solid #43b104;
  }
`;
export default function ConfigParametersForm({ node, dispatcher }) {
  const { configParameters } = node.data;
  const parameterEntries = Object.entries(configParameters);

  const onChangeConfigParametersHandler = (event, inputType) => {
    if (inputType === "number") {
      event.target.value = parseInt(event.target.value, 10);
    }
    dispatcher({ type: "updateConfigParameters", payload: event });
  };
  console.log("node: ", node);
  console.log("parameterEntries: ", parameterEntries);
  return (
    <Form style={Styled.FormStyle}>
      <Styled.SectionName>Parameters:</Styled.SectionName>
      {parameterEntries.map((entry, index) => (
        <FormGroup row key={index}>
          <Label sm={4}>{entry[0]}</Label>
          <Col sm={8}>
            <InputWrapper>
              {node.type === "CALCULATE" ? (
                <CalculateNodeConfigParameters node={node} dispatcher={dispatcher} />
              ) : (
                <InputStyled
                  id={entry[0]}
                  name={entry[0]}
                  type={typeof entry[1]}
                  value={entry[1]}
                  onChange={(event) => onChangeConfigParametersHandler(event, typeof entry[1])}
                />
              )}
            </InputWrapper>
          </Col>
        </FormGroup>
      ))}
    </Form>
  );
}
