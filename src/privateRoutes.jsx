


import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    let auth = localStorage.getItem("token")

    return auth ? children : <Navigate to='/' />;
};

export default PrivateRoute;