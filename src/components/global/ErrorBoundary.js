import React from 'react';
import { useSelector } from "react-redux";
import { openNotification } from '../../app-global/dom/notification';
import useDidMountEffect from '../../utils/useDidMountEffect';
import PropTypes from "prop-types";
export default function ErrorBoundary({children}) {
    const error = useSelector(state => state.error);
    useDidMountEffect(() => {
        openNotification("", error.message, "error");
    }, [error])
    return (
        <>
          {children}  
        </>
    )
}

ErrorBoundary.propTypes = {
    children: PropTypes.element
}