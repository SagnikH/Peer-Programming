const { auth } = require("@googleapis/oauth2");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

const oauth2Client = new auth.OAuth2(
	process.env.CLIENT_ID,
	process.env.CLIENT_SECRET,
	process.env.CALLBACK_URL
);

// generate and redirect to auth url
function redirectToGoogleAuth(req, res) {
	// clients sends where it wants to be redirected to
	// after login as query parameter "redirect"
	const redirect = req.query.redirect;

	// using state as to keep track of where client
	// wants to be redirected after successful auth
	// default redirect path "/dashboard"
	const state = redirect ?? "/dashboard";

	// permission for email and profile
	const scopes = [
		"https://www.googleapis.com/auth/userinfo.profile",
		"https://www.googleapis.com/auth/userinfo.email",
	];

	const URL = oauth2Client.generateAuthUrl({
		access_type: "offline",
		prompt: "consent",
		scope: scopes,
		state
	});

	res.redirect(URL);
}


// code sent by google oauth is used to create access token
// which is used to fetch user's google profile
// if new user, we create a new user in db
// add _id (userid in db) and redirect (state) to locals 
// for next handler  
const googleCallback = async (req, res, next) => {
	// redirect URl stored in state
	res.locals.redirect = req.query.state;

	// code sent by google oauth is used to get access token
	const code = req.query.code;
	
	try {
		const { tokens } = await oauth2Client.getToken(code);
		const googleUser = await getGoogleUser(tokens);

		const { email, name, id, picture } = googleUser;

		var user = await User.findOne({ email });

		if (!user) {
			// New user 
			user = await User.create({ email, name, googleID: id, picture });
		}

		res.locals._id = user._id;
		next();
	} catch (e) {
		console.error("Error in googleCallback", e);
		res.status(500).json(e);	// TODO: change this in deployment
	}
};

// verify jwtToken sent as cookie, if valid token decode
// and add _id (userid) to loacals 
const verifyJWT = async (req, res, next) => {
	if (!req.cookies.jwtToken) {
		res.status(403).json("jwt token missing [Not signed in]");
		return;
	}

	const jwtToken = req.cookies.jwtToken;

	try {
		// if valid sign, returns the payload, else throws an error
		const decoded = jwt.verify(jwtToken, process.env.JWT_PRIVATE_KEY);
		res.locals._id = decoded._id;

		next();
	} catch (e) {
		console.error("ERROR in verify jwt", e);
		res.status(403).json(e);	// TODO: change this in deployment
	}
};




// ----- Util Functions ----=
// TODO: understand the catch and error part
// Use access token to fetch user's profile
async function getGoogleUser(tokens) {
	// Fetch the user's profile with the access token and bearer
	const googleUser = await axios
		.get(
			`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
			{
				headers: {
					Authorization: `Bearer ${tokens.id_token}`,
				},
			}
		)
		.then((res) => res.data)
		.catch((error) => {
			console.log("Error in obtaining user's google profile");
			next(new Error(error.message));		
		});

	return googleUser;
}



module.exports = { redirectToGoogleAuth, googleCallback, verifyJWT };