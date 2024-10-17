import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { deletePatient, getPatients } from "../../services/apiService";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPatients = async () => {
      const response = await getPatients(token, {
        page,
        limit: rowsPerPage,
        search,
      });
      setPatients(response.patients);
      setTotalPages(response.totalPages);
    };
    fetchPatients();
  }, [token, page, rowsPerPage, search]);

  const handleDelete = async (id) => {
    await deletePatient(id, token);
    setPatients(patients.filter((patient) => patient._id !== id));
    setNotification({
      open: true,
      message: "Patient deleted successfully!",
      severity: "success",
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handleCloseSnackbar = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
      <Typography
        variant="h4"
        sx={{ marginBottom: 2, fontWeight: "bold", color: "#1976d2" }}
      >
        Patient List
      </Typography>
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 2 }}
      >
        <Button
          onClick={() => navigate("/add-patient")}
          variant="contained"
          color="primary"
          sx={{ height: "56px" }} // Set height to match TextField
        >
          Add Patient
        </Button>

        <TextField
          label="Search Patients"
          variant="outlined"
          value={search}
          onChange={handleSearch}
          sx={{ height: "56px", width: "200px" }} // Set height to match Button
        />
      </Box>

      <TableContainer
        component={Paper}
        sx={{ boxShadow: 3, borderRadius: "8px" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Age
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Condition
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.length ? (
              patients.map((patient) => (
                <TableRow key={patient._id}>
                  <TableCell align="center">{patient.name}</TableCell>
                  <TableCell align="center">{patient.age}</TableCell>
                  <TableCell align="center">{patient.condition}</TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() => handleDelete(patient._id)}
                      variant="outlined"
                      color="secondary"
                      sx={{ borderRadius: "20px" }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography>No patients found...</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalPages * rowsPerPage}
        rowsPerPage={rowsPerPage}
        page={page - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ marginTop: 2 }}
      />

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PatientList;
