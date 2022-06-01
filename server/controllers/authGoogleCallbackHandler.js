const jwt = require("jsonwebtoken");
require("dotenv").config();

// using the userid (_id) to create jwtToken and 
// setting it as a cookie then redirecting
const googleCallbackHandler = (req, res) => {
	const _id = res.locals._id;
	const redirect = res.locals.redirect;

	const jwtToken = jwt.sign({ _id }, process.env.JWT_PRIVATE_KEY);

	res
		.cookie("jwtToken", jwtToken, {
			httpOnly: true,		// accessible only by web servers
			secure: true,		// to be used with https only
			sameSite: "none",	// ??
		})
		.redirect(process.env.CLIENT_URL + redirect);
};

module.exports = { googleCallbackHandler };
