const router = require("express").Router();
const {
	createDocument,
	getDocument,
	updateDocument,
  deleteDocument
} = require("../controllers/documentHandler");

router.post("/", createDocument);

router.get("/:id", getDocument);

//sends a portion of the data to update existing data
router.patch("/:id", updateDocument);

router.delete("/:id", deleteDocument);

module.exports = router;
