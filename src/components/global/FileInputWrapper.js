import React from "react";
import styled from "styled-components";
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
