const router = require("express").Router();
const {
	createDocument,
	getDocument,
	updateDocument,
	deleteDocument,
	createLeetcodeDocument,
} = require("../controllers/documentHandler");

router.post("/", createDocument);

router.post("/leetcode", createLeetcodeDocument);

router.get("/:id", getDocument);

//sends a portion of the data to update existing data
router.patch("/:id", updateDocument);

router.delete("/:id", deleteDocument);

module.exports = router;
