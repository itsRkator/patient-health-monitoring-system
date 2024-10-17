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
import { useNavigate } from "react-router-dom";
import {
  createAuthorizationRequest,
  getPatients,
} from "../../services/apiService";

const CreateAuthorization = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

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
    // Fetch patients from the server
    const fetchPatients = async () => {
      try {
        const response = await getPatients(token, {});
        setPatients(response.patients); // Assuming the data structure matches
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

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
    <Box
      sx={{
        padding: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{ padding: 4, width: "400px", borderRadius: "8px" }}
      >
        <Typography variant="h5" align="center" gutterBottom>
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
          />
          <TextField
            fullWidth
            label="Insurance Plan"
            name="insurancePlan"
            value={formData.insurancePlan}
            onChange={handleChange}
            required
            margin="normal"
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
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Diagnosis Code"
            name="diagnosisCode"
            value={formData.diagnosisCode}
            onChange={handleChange}
            required
            margin="normal"
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
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: 2, width: "100%" }}
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
