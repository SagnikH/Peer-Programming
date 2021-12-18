import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToken, removeToken } from "../redux/slices/authTokenSlice";
import { checkAuth } from "../utils/checkAuth";

import Loading from "../components/Loading";

export const PrivateRoute = ({ children, redirect }) => {
	const dispatch = useDispatch();

	const [isLoaded, setisLoaded] = useState(false);
	const [isAuthorized, setisAuthorized] = useState(null);

	//whenever we go to a protected route and check for the user we set the TOKEN
	useEffect(() => {
		(async () => {
			try {
				const userPayload = await checkAuth();

				setisAuthorized(userPayload);

				if (userPayload) {
					const TOKEN = JSON.stringify(userPayload);
					dispatch(addToken(TOKEN));
				} else {
					dispatch(removeToken());
				}

				//set load after setting data
				setisLoaded(true);
			} catch (e) {
				console.log(e);
				dispatch(removeToken());

				setisLoaded(true);
			}
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
