const express = require("express");

const {
  createAUthorization,
  getAuthorization,
  updateAuthorization
} = require("../controllers/authorizationController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);
router.post("/", createAUthorization);
router.get("/:patientId", getAuthorization);
router.put("/:id", updateAuthorization);

module.exports = router;
