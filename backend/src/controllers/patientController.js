const { body, validationResult } = require("express-validator");
const Patient = require("../models/Patient");

const getPatients = async (req, res) => {
  const { search, page = 1, limit = 10 } = req.query;
  try {
    const query = search
      ? {
          $or: [{ name: { $regex: search, $options: "i" } }],
        }
      : {};

    const patients = await Patient.find(query)
      .limit(limit)
      .skip((page - 1) * limit);
    const totalPatients = await Patient.countDocuments(query);

    res.json({
      patients,
      totalPages: Math.ceil(totalPatients / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPatientDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await Patient.findById(id);
    patient
      ? res.json(patient)
      : res.status(404).json({ message: "Patient not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addNewPatient = async (req, res) => {
  const {
    name,
    age,
    condition,
    medicalHistory,
    medicationHistory,
    labResults,
    treatmentPlan,
  } = req.body;

  try {
    const newPatient = new Patient({
      name,
      age,
      condition,
      medicalHistory,
      medicationHistory,
      labResults,
      treatmentPlan,
    });
    const patient = await newPatient.save();

    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePatientDetails = async (req, res) => {
  const { id } = req.params;

  const {
    name,
    age,
    condition,
    medicalHistory,
    medicationHistory,
    labResults,
    treatmentPlan,
  } = req.body;

  try {
    const updatedPatient = await Patient.findByIdAndUpdate(
      id,
      {
        name,
        age,
        condition,
        medicalHistory,
        medicationHistory,
        labResults,
        treatmentPlan,
      },
      { new: true }
    );

    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.json(updatedPatient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePatient = async (req, res) => {
  const { id } = req.params;

  try {
    await Patient.findByIdAndDelete(id);
    res.status(200).json({ message: "Patient deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getPatients,
  getPatientDetails,
  addNewPatient,
  updatePatientDetails,
  deletePatient,
};
