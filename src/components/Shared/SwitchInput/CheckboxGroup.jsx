import React from "react";
import { Label } from "reactstrap";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  //background:${props => props.disabled ? 'gray' : 'yellow'};
  /* background: 4px solid ${props => props.checked ? '#b7e4c7' : 'transparent'}; */
  opacity:${props => props.disabled ? '0.4' : '1'};
`;

const propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  labelSize:PropTypes.string,
  children: PropTypes.element,
};
export default function CheckboxGroup({ label, disabled,checked, labelSize, children }) {
  return (
    <Container disabled={disabled} checked={checked}>
      <Label style={{ userSelect: 'none', fontSize: labelSize,margin:'2px' }} check>{label}</Label>
      {children}
    </Container>
  );
}

CheckboxGroup.propTypes = propTypes;
