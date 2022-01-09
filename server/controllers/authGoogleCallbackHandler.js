const jwt = require("jsonwebtoken");
require("dotenv").config();

//gets the db id now set the jwt token cookie
const googleCallbackHandler = (req, res) => {
	const _id = res.locals._id;
  const redirect = res.locals.redirect;

	console.log("id in auth handler", _id);
  console.log("redirect url", redirect);

	const jwtToken = jwt.sign({ _id }, process.env.JWT_PRIVATE_KEY);
	console.log("jwt token", jwtToken);

	res
		.cookie("jwtToken", jwtToken, {
			httpOnly: true,
			secure: true,
			sameSite: "none",
		})
		.redirect(process.env.CLIENT_URL + redirect);
};

module.exports = { googleCallbackHandler };
