import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Snackbar,
  Alert,
  MenuItem,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import {
  createAuthorizationRequest,
  getPatients,
} from "../../services/apiService";

const CreateAuthorization = () => {
  const token = localStorage.getItem("token");
  const { id } = useParams();

  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    patient: "",
    treatmentType: "",
    insurancePlan: "",
    dateOfService: "",
    diagnosisCode: "",
    doctorNotes: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await getPatients(token, {});
        setPatients(response.patients);

        // If an id is present, pre-fill the patient field
        if (id) {
          const foundPatient = response.patients.find(
            (patient) => patient._id === id
          );
          if (foundPatient) {
            setFormData((prev) => ({
              ...prev,
              patient: foundPatient._id, // Set the patient ID
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createAuthorizationRequest(formData, token);

      if (response) {
        setSnackbarMessage("Authorization created successfully!");
        setOpenSnackbar(true);
        setFormData({
          patient: "",
          treatmentType: "",
          insurancePlan: "",
          dateOfService: "",
          diagnosisCode: "",
          doctorNotes: "",
        });
      } else {
        throw new Error("Failed to create authorization");
      }
    } catch (error) {
      setSnackbarMessage(error.message);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box className="flex justify-center items-center p-4">
      <Paper elevation={3} className="p-6 w-4/5 rounded-lg shadow-lg bg-white">
        <Typography variant="h5" align="center" className="mb-4 text-gray-700">
          Create Authorization
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            select
            fullWidth
            label="Patient"
            name="patient"
            value={formData.patient}
            onChange={handleChange}
            required
            margin="normal"
            disabled={Boolean(id)} // Disable if id is present
            className="bg-gray-50"
          >
            {patients.map((patient) => (
              <MenuItem key={patient._id} value={patient._id}>
                {patient.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Treatment Type"
            name="treatmentType"
            value={formData.treatmentType}
            onChange={handleChange}
            required
            margin="normal"
            className="bg-gray-50"
          />
          <TextField
            fullWidth
            label="Insurance Plan"
            name="insurancePlan"
            value={formData.insurancePlan}
            onChange={handleChange}
            required
            margin="normal"
            className="bg-gray-50"
          />
          <TextField
            fullWidth
            label="Date of Service"
            name="dateOfService"
            type="date"
            value={formData.dateOfService}
            onChange={handleChange}
            required
            margin="normal"
            className="bg-gray-50"
            InputLabelProps={{
              shrink: true, // Ensures the label is always in the "shrink" state when using type="date"
            }}
          />
          <TextField
            fullWidth
            label="Diagnosis Code"
            name="diagnosisCode"
            value={formData.diagnosisCode}
            onChange={handleChange}
            required
            margin="normal"
            className="bg-gray-50"
          />
          <TextField
            fullWidth
            label="Doctor Notes"
            name="doctorNotes"
            value={formData.doctorNotes}
            onChange={handleChange}
            required
            margin="normal"
            multiline
            rows={4}
            className="bg-gray-50"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700"
          >
            Create Authorization
          </Button>
        </form>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateAuthorization;
