const router = require("express").Router();
const { googleCallbackHandler } = require("../controllers/authGoogleCallbackHandler");
const { redirectToGoogleAuth, googleCallback } = require("../middlewares/authMiddleware");
require("dotenv").config();


router.get("/google", redirectToGoogleAuth);

router.get("/google/callback", googleCallback, googleCallbackHandler);


// TODO: use clearCookie??
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
