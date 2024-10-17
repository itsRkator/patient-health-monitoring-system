const express = require("express");

const {
  getPatients,
  getPatientDetails,
  addNewPatient,
  updatePatientDetails,
  deletePatient,
} = require("../controllers/patientController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);
router.get("/", getPatients);
router.get("/:id", getPatientDetails);
router.post("/", addNewPatient);
router.put("/:id", updatePatientDetails);
router.delete("/:id", deletePatient);

module.exports = router;
