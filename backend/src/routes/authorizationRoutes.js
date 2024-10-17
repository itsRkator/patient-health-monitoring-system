const express = require("express");

const {
  createAUthorization,
  getAuthorization,
} = require("../controllers/authorizationController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);
router.post("/", createAUthorization);
router.get("/", getAuthorization);

module.exports = router;
