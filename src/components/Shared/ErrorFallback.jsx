import React from "react";
import { Button } from "reactstrap";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledErrorContainer = styled.div`
  width: 70%;
  overflow: auto;
  text-align: center;
  padding: 20px;
  border: 1px solid tomato;
  border-radius: 5px;
  background-color: black;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;
const StyledErrorHeading = styled.h2`
  font-size: 24px;
  color: #e74c3c;
  margin-bottom: 10px;
`;
const StyledErrorText = styled.p`
  font-size: 18px;
  margin-bottom: 15px;
  color: whitesmoke;
`;
const StyledErrorMessage = styled.p`
  font-size: 16px;
  color: whitesmoke;
`;

const propTypes = {
  error: PropTypes.object,
  resetErrorBoundary: PropTypes.func,
};
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div
      style={{
        height: "100vh",
        background: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(33, 37, 41)",
      }}
    >
      <StyledErrorContainer>
        <StyledErrorHeading>Oops, something went wrong!</StyledErrorHeading>
        <StyledErrorText>
          Sorry, an error occurred while rendering this component.
        </StyledErrorText>
        <StyledErrorMessage>{error.message}</StyledErrorMessage>
        <Button onClick={resetErrorBoundary}>Refresh the page</Button>
      </StyledErrorContainer>
    </div>
  );
}

ErrorFallback.propTypes = propTypes;

export default ErrorFallback;
