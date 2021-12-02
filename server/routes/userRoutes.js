const router = require("express").Router();

//fetch current data from the database and send it back to
router.get("/", (req, res) => {
	// res.render("profile", { user: req.user });
	// console.log(req.user);
	res.json({ user: req.user }).status(200);
});

module.exports = router;
