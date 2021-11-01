/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuthorizationToken } from "../app-global/helpers/httpHelpers";
import { loginSuccess } from "../store/actions/authActions";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    const jwtToken = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("user"));
    if (jwtToken) {
      setAuthorizationToken(jwtToken);
      dispatch(loginSuccess(userData));
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
