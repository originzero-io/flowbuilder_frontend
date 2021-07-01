/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {useSelector } from "react-redux";
import PropTypes from "prop-types"
const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated } = useSelector((state) => state.authReducer);
    return (
        <Route { ...rest } render={ props => (
            isAuthenticated ? 
            <Component {...props} /> : 
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        ) }
        />
    );
};
PrivateRoute.propTypes = {
    component: PropTypes.element,
}
export default PrivateRoute;