const { userHandler } = require("../controllers/userHandler");
const { verifyJWT } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.get("/", userHandler);

module.exports = router;
