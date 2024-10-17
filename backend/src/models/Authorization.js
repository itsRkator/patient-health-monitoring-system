const mongoose = require("mongoose");

const authorizationSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    treatmentType: { type: String, required: true },
    insurancePlan: { type: String, required: true },
    dateOfService: { type: Date, required: true },
    diagnosisCode: { type: String, required: true },
    doctorNotes: { type: String },
    status: { type: String, default: "pending" },
    dateRequested: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Authorization", authorizationSchema);
