//LC -> authUserInfo === token
//this function is called everytime before a component is mount to check if user token exists in LOCAL STORAGE

import { addUser, removeUser } from "../store/userSlice";
import { addToken, removeToken } from "../store/authTokenSlice";
import store from "../store/store";

const checkAuthToken = async (user) => {
	// const dispatch = useDispatch();
	const token = localStorage.getItem("authUserInfo");

	if (token) {
		store.dispatch(addToken(token));

		//checking to see if the user state exists in redux store
		if (!user._id) {
			//parse user data from the token
			const parsedToken = JSON.parse(token);
			console.log(parsedToken);
			store.dispatch(addUser(parsedToken));
		}
	} else {
		//clears the state in case our localStorage doesn't have the authUserInfo token
		store.dispatch(removeToken());
		store.dispatch(removeUser());

    //simple implementation -> flash of protected data being shown, handle that
		// Router.push("/");
	}
};

export default checkAuthToken;
