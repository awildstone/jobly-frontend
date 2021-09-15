import React, { useContext }  from 'react';
import { Redirect, Route } from 'react-router-dom';
import UserContext from '../context/UserContext';

/**
 * Renders ProtectedRoute component.
 * 
 * Consumes currentUser from UserContext and conditionally
 * renders a Route or Redirect based on currentUser state.
 * 
 * @param {children, ...otherProps}
 * @returns Route or Redirect
 */

const ProtectedRoute = ({ children, ...otherProps }) => {
    const { currentUser } = useContext(UserContext);
    console.debug(
        "ProtectedRoute",
        "currentUser=", currentUser,
    );

    if (currentUser){
        return (
            <Route {...otherProps}>
                    { children }
                </Route>
        )
    }
    return <Redirect to='/login' />
};

export default ProtectedRoute;