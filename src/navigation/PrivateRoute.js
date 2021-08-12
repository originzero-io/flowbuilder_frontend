/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {useSelector } from "react-redux";
const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated } = useSelector((state) => state.authReducer);
    console.log("authenticate:", isAuthenticated);
    return (
        <Route { ...rest } render={ props => (
            isAuthenticated ? 
            <Component {...props} /> : 
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        ) }
        />
    );
};
export default PrivateRoute;