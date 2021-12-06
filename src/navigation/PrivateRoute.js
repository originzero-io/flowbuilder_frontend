/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { setAuthorizationToken } from "../app-global/helpers/httpHelpers";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
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
