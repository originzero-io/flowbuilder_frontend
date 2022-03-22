import React from "react";
import { Label } from "reactstrap";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const propTypes = {
  label: PropTypes.string,
  labelSize:PropTypes.string,
  children: PropTypes.element,
};
export default function CheckboxGroup({ label,labelSize, children }) {
  return (
    <Container>
      <Label style={{ userSelect: 'none', fontSize: labelSize,margin:'2px' }} check>{label}</Label>
      {children}
    </Container>
  );
}

CheckboxGroup.propTypes = propTypes;
