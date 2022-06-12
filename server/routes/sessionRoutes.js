const router = require("express").Router();
const {
	createSession,
	addSharedSession,
	getSession,
	deleteSession,
	deleteSharedSession,
} = require("../controllers/sessionHandler");

router.post("/", createSession);
router.get("/:id", getSession);
router.delete("/:id", deleteSession);

router.post("/shared/:id", addSharedSession);
router.patch("/shared/:id", deleteSharedSession);


module.exports = router;
