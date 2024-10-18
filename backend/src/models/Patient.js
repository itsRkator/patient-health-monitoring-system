const mongoose = require("mongoose");

// Define sub-schemas for detailed fields
const medicalHistorySchema = new mongoose.Schema({
  diagnosis: { type: String, required: true },
  date: { type: Date, required: true },
  doctor: { type: String },
});

const medicationHistorySchema = new mongoose.Schema({
  medication: { type: String, required: true },
  dosage: { type: String, required: true },
  startDate: { type: Date },
  endDate: { type: Date },
  prescribingDoctor: { type: String },
});

const labResultSchema = new mongoose.Schema({
  testName: { type: String, required: true },
  result: { type: String, required: true },
  date: { type: Date, required: true },
  notes: { type: String },
});

const treatmentPlanSchema = new mongoose.Schema({
  treatment: { type: String, required: true },
  doctor: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  notes: { type: String },
});

const patientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    condition: { type: String, required: true }, // Example: 'Diabetes', 'Hypertension'

    // Array of sub-documents
    medicalHistory: [medicalHistorySchema],
    medicationHistory: [medicationHistorySchema],
    labResults: [labResultSchema],
    treatmentPlan: [treatmentPlanSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);
