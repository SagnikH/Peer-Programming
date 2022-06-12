const router = require("express").Router();
const {
	createDocument,
	getDocument,
	deleteDocument,
	createLeetcodeDocument,
} = require("../controllers/documentHandler");

router.post("/", createDocument);
router.post("/leetcode", createLeetcodeDocument);
router.get("/:id", getDocument);
router.delete("/:id", deleteDocument);

module.exports = router;
