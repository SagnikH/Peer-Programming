const router = require("express").Router();
const {
	createSession,
	addSharedSession,
	getSession,
	updateSession,
	deleteSession,
	deleteSharedSession,
} = require("../controllers/sessionHandler");

router.post("/", createSession);

router.post("/shared/:id", addSharedSession);

router.get("/:id", getSession);

//sends a portion of the data to update existing data
//TODO: NOTE: update session document when we create/ delete a document
//(in the document router handler)
router.patch("/:id", updateSession);

router.patch("/shared/:id", deleteSharedSession);

router.delete("/:id", deleteSession);

module.exports = router;
