const router = require("express").Router();
const {
	googleCallbackHandler,
} = require("../controllers/authGoogleCallbackHandler");
const { googleCallback } = require("../middlewares/authMiddleware");
const { getGoogleAuthURL } = require("../utils/googleUtils");

require("dotenv").config();

router.get("/google", (req, res) => {
	res.redirect(getGoogleAuthURL());
});

router.get("/google/callback", googleCallback, googleCallbackHandler);

router.get("/logout", (req, res) => {
	res
		.cookie("jwtToken", "", {
			httpOnly: true,
			expires: new Date(0),
			secure: true,
			sameSite: "none",
		})
		.redirect(process.env.CLIENT_URL);
});

module.exports = router;
