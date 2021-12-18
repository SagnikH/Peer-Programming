const router = require("express").Router();
const {
	createSession,
	getSession,
	updateSession,
	deleteSession,
} = require("../controllers/sessionHandler");

router.post("/", createSession);

router.get("/:id", getSession);

//sends a portion of the data to update existing data
//TODO: NOTE: update session document when we create/ delete a document
//(in the document router handler)
router.patch("/:id", updateSession);

router.delete("/:id", deleteSession);

module.exports = router;
