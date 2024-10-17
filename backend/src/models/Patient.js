const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    condition: { type: String },
    medicalHistory: { type: String },
    medicationHistory: { type: String },
    labResults: { type: String },
    treatmentPlan: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);
