const express = require("express");
const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");
const authorizationRoutes = require("./routes/authorizationRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/patients", patientRoutes);
router.use("/authorization", authorizationRoutes);

module.exports = router;
