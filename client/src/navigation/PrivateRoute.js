import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { checkAuth } from "../utils/checkAuth";

import Loading from "../components/Loading";

export const PrivateRoute = ({ children, redirect }) => {
	const [isLoaded, setisLoaded] = useState(false);
	const [isAuthorized, setisAuthorized] = useState(false);

	useEffect(() => {
		(async () => {
			console.log("sending request....");
			const userFlag = await checkAuth();
			console.log("received response.....", userFlag);

			console.log("setting auth");
			setisAuthorized(userFlag);

      //set load after setting data
			console.log("setting load");
			setisLoaded(true);
		})();
	}, []);

	if (!isLoaded) return <Loading />;
	else {
		return isAuthorized ? (
			children
		) : (
			<Navigate to={redirect ? redirect : "/"} />
		);
	}
};
