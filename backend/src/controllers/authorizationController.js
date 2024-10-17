const Authorization = require("../models/Authorization");

const createAUthorization = async (req, res) => {

  const {
    patient,
    treatmentType,
    insurancePlan,
    dateOfService,
    diagnosisCode,
    doctorNotes,
  } = req.body;
  try {
    const authorization = new Authorization({
      patient,
      treatmentType,
      insurancePlan,
      dateOfService,
      diagnosisCode,
      doctorNotes,
    });

    const newAuthorization = await authorization.save();

    res.status(201).json(newAuthorization);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAuthorization = async (req, res) => {
  try {
    const requests = await Authorization.find().populate("patient");
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createAUthorization, getAuthorization };
