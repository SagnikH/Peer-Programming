import { useEffect } from "react";
import { useSelector } from "react-redux";
import checkAuthToken from "../../utils/checkAuthTokenUtil";

const dashboard = () => {
	const user = useSelector((state) => state.user);

	useEffect(() => {
		//always at the beginning check to see if token exists in LC mainly to handle page refresh and loosing the state

		checkAuthToken(user);

		//TODO: decide whether to redirect in case of token not present
		//probably the token will the there as checkAuthToken mainly handles the loss of state values
	}, []);
	return <div>I am the dashboard </div>;
};

export default dashboard;
