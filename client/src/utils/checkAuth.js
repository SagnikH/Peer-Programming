import axios from "axios";

export const checkAuth = async () => {
	try {
		const res = await axios.get("http://localhost:4000/api/user", {
			withCredentials: true,
		});

		const user = res.data.user;
		const {
			name,
			email,
			googleID,
			picture,
			_id,
			sharedSessions,
			userSessions,
		} = user;

		const userPayload = {
			name,
			email,
			googleID,
			picture,
			_id,
			sharedSessions,
			userSessions,
		};

		return userPayload;
	} catch (e) {
		console.log(e);

		return null;
	}
};
