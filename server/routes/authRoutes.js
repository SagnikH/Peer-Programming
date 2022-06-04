const router = require("express").Router();
const { googleCallbackHandler } = require("../controllers/authGoogleCallbackHandler");
const { redirectToGoogleAuth, googleCallback } = require("../middlewares/authMiddleware");
require("dotenv").config();


router.get("/google", redirectToGoogleAuth);

router.get("/google/callback", googleCallback, googleCallbackHandler);


router.get("/logout", (req, res) => {
	res
		.clearCookie("jwtToken", {
			httpOnly: true,
			secure: true,
			sameSite: "none",
		})
		.redirect(process.env.CLIENT_URL);
});

module.exports = router;
