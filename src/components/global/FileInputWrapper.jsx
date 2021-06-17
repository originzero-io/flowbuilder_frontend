import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types"

const Box = styled.div`
  height: 30px;
`;
const Label = styled.label`
  display: inline-block;
  cursor: pointer;
  height: 30px;
`;
export default function FileInputWrapper({ children }) {
  return (
    <Box>
      <Label>{children}</Label>
    </Box>
  );
}

FileInputWrapper.propTypes = {
  children: PropTypes.element.isRequired
}
