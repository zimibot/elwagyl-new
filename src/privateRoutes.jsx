


import React from 'react';
import { Navigate } from 'react-router-dom';
import { getCookie } from './api';

const PrivateRoute = ({ children }) => {
    let auth = localStorage.getItem("token")

    return auth ? children : <Navigate to='/' />;
};

export default PrivateRoute;