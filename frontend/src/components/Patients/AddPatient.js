import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { addPatient } from "../../services/apiService";

const AddPatient = () => {
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    condition: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

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
      const response = await addPatient(formData, token);

      if (response) {
        setSnackbarMessage("Patient added successfully!");
        setOpenSnackbar(true);
        setFormData({ name: "", age: "", condition: "" });
      } else {
        throw new Error("Failed to add patient");
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
          Add Patient
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Condition"
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            required
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: 2, width: "100%" }}
          >
            Add Patient
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

export default AddPatient;
