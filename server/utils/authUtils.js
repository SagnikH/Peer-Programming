const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("../models/userModel");
require("dotenv").config();

const PORT = process.env.PORT;
// console.log("callback", process.env.CALLBACK_URL);

//the callback inside the statergy calls this function to create a cookie and send it to the browser
passport.serializeUser((user, done) => {
	const id = user._id.toString();
	// console.log("inside serializeUser");
	done(null, id);
});

//decrypt the cookie and attaches the token(cookieUser) to the req object
//invoked when browser sends a request to the server -> the cookie is sent along with the req -> token returned in req obj
passport.deserializeUser(async (id, done) => {
	const user = await User.findById(id);
	const { googleID, email, picture, name, _id, sharedSessions, userSessions } =
		user;
	const cookieUser = {
		googleID,
		email,
		picture,
		name,
		_id,
		sharedSessions,
		userSessions,
	};
	// console.log("inside deserializeUser");
	// console.log(cookieUser);
	done(null, cookieUser);
});

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: process.env.CALLBACK_URL,
		},
		async function (accessToken, refreshToken, bearer, info, done) {
			const { email, name, sub, picture } = info._json;

			try {
				var user = await User.findOne({ email });

				if (user) {
					// console.log(`user present ${user}`);
					done(null, user);
				} else {
					user = await User.create({ email, name, googleID: sub, picture });
					// console.log(`user created ${user}`);
					done(null, user);
				}
			} catch (e) {
				console.log(e);
			}
			// console.log(info);
		}
	)
);
