const express = require("express");

const { login, signup, refresh } = require("../controllers/authController");

const router = express.Router();

router.post("/login", login);
router.post("/register", signup);
router.post("/refresh", refresh);

module.exports = router;
