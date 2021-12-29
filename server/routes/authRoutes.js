const passport = require("passport");
require("dotenv").config();

const router = require("express").Router();

const CLIENT_URI = process.env.CLIENT_URL;
// console.log("client URI from env", process.env.CLIENT_URL);

router.get(
	"/google",
	passport.authenticate("google", {
		scope: ["profile", "email"],
	})
);

router.get(
	"/google/callback",
	passport.authenticate("google", {
		failureRedirect: "/auth/login",
	}),
	function (req, res) {
		// res.send(`Callback called ${req.user}`);
		res.redirect(CLIENT_URI);
	}
);

router.get("/logout", (req, res) => {
	//logout is handled by
	req.logout();
	res.redirect(CLIENT_URI);
});

module.exports = router;
