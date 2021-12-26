import React from "react";
import { Route, Navigate } from "react-router-dom";
import auth from "./auth";

export const PrivateRoute = ({ children, redirect }) => {


    return auth.isAuthenticated() ? children : <Navigate to={redirect ? redirect : "/"} />;
    // return auth.isAuthenticated() ? children : <code>Not Authorized</code>;
}
