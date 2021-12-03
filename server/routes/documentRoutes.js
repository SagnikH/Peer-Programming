const router = require("express").Router();
const { createDocument } = require("../controllers/documentHandler");

router.post("/", createDocument);

router.get("/:id", (req, res) => {
	res.json("user requests to get document info").status(200);
});

//sends a portion of the data to update existing data
router.patch("/:id", (req, res) => {
	res.json("user sends down data to update document").status(200);
});

router.delete("/:id", (req, res) => {
	res.json("deletes specified document").status(200);
});

module.exports = router;
