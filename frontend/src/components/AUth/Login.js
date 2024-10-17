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
import { loginUser } from "../../services/apiService";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

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
      const response = await loginUser(formData);
      if (response) {
        const token = response.token; // Extract the token from the response
        // Save the token to localStorage
        localStorage.setItem("token", token);

        setSnackbarMessage("Login successful, redirecting to the dashboard...");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);

        // Redirect after setting the token (e.g., to dashboard)
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      setSnackbarMessage(error?.response?.data?.message || error.message);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: "400px",
          borderRadius: "8px",
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            margin="normal"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            type="password"
            margin="normal"
            sx={{ marginBottom: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: 2, width: "100%", height: "45px" }}
          >
            Login
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
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
