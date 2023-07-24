import React from "react";
import { Button } from "reactstrap";
import PropTypes from "prop-types";

const propTypes = {
  error: PropTypes.object,
  resetErrorBoundary: PropTypes.func,
};
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div style={{ padding: "10px" }}>
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
      <Button onClick={resetErrorBoundary}>Refresh the page</Button>
    </div>
  );
}

ErrorFallback.propTypes = propTypes;

export default ErrorFallback;
