const User = require("../models/userModel");

const userHandler = async (req, res) => {
	const id = res.locals._id;
	//console.log("id in db handler", id);

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
		//console.error("db handler", e);
		res.status(500).json(e);
	}
};

module.exports = { userHandler };
