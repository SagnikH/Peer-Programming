const passport = require("passport");

const router = require("express").Router();

const CLIENT_URI = "http://localhost:3000";

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
