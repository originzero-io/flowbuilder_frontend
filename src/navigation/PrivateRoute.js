/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { setAuthorizationToken } from "../app-global/helpers/httpHelpers";
import useAuth from "../utils/useAuth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    const jwtToken = localStorage.getItem("token");
    if (jwtToken) {
      setAuthorizationToken(jwtToken);
    }
  }, []);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};
export default PrivateRoute;
