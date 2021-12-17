import React, { useState } from "react";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children, redirect }) => {
	const [isAuthorized, setisAuthorized] = useState(true);

	return isAuthorized ? children : <Navigate to={redirect ? redirect : "/"} />;
	// return auth.isAuthenticated() ? children : <code>Not Authorized</code>;
};