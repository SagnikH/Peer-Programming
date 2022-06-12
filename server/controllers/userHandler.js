const User = require("../models/userModel");

const userHandler = async (req, res) => {
	const id = res.locals._id;

	try {
		const user = await User.findById(id);
		const {
			googleID,
			email,
			picture,
			name,
			_id,
			sharedSessions,
			userSessions,
		} = user;

		const userData = {
			googleID,
			email,
			picture,
			name,
			_id,
			sharedSessions,
			userSessions,
		};

		res.status(200).json(userData);
	} catch (e) {
		console.error("Error in userHandler", e);
		res.status(500).json("Error in userHandler");	
	}
};

module.exports = { userHandler };
