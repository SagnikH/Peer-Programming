import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { checkAuth } from "../utils/checkAuth";

import Loading from "../components/Loading";

export const PrivateRoute = ({ children, redirect }) => {
	const [isLoaded, setisLoaded] = useState(false);
	const [isAuthorized, setisAuthorized] = useState(null);

  const pathname = window.location.pathname;

	useEffect(() => {
    console.log("location", pathname);

		(async () => {
			try {
				const userPayload = await checkAuth();

				setisAuthorized(userPayload);

				//set load after setting data
				setisLoaded(true);
			} catch (e) {
				console.log(e);

				setisLoaded(true);
			}
		})();
	}, []);

	useEffect(() => {
		if (isLoaded && !isAuthorized)
			window.location = `${process.env.REACT_APP_SERVER_URL}/auth/google?redirect=${pathname}`;
	}, [isLoaded, isAuthorized]);

	if (!isLoaded) return <Loading />;
	else {
		return isAuthorized ? (
			children
		) : (
			<Loading />
		);
	}
};
