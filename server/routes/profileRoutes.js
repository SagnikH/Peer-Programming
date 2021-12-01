const router = require("express").Router();

router.get("/", (req, res) => {
	// res.render("profile", { user: req.user });
	// console.log(req.user);
	res.json({ user: req.user }).status(200);
});

module.exports = router;
