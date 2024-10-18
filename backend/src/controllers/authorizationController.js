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
  const { patientId } = req.params;
  const { page = 1, limit = 10 } = req.query;
  try {
    const requests = await Authorization.find({ patient: patientId })
      .populate("patient")
      .limit(limit)
      .skip((page - 1) * limit);

    const totalRequests = await Authorization.countDocuments({
      patient: patientId,
    });

    res.status(200).json({
      requests,
      totalPages: Math.ceil(totalRequests / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAuthorization = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedAuthorization = await Authorization.findByIdAndUpdate(id, {
      status: "Approved",
    });

    if (!updatedAuthorization) {
      return res.status(404).json({ message: "Request not found." });
    }

    res.json(updatedAuthorization);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createAUthorization, getAuthorization, updateAuthorization };
