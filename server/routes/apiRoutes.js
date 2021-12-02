const router = require("express").Router();

router.get("/", (req, res) => {
  res.json("api index").status(200);
});

module.exports = router;