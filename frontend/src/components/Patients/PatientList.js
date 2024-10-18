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
  const token = localStorage.getItem("token");
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

  const handleChangePage = (newPage) => {
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
    <>
      <Box className="flex items-center gap-2 mb-2 justify-end">
        <input
          type="text"
          placeholder="Search Patients"
          value={search}
          onChange={handleSearch}
          className="h-4 w-36 p-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <Button
          onClick={() => navigate("/add-patient")}
          variant="contained"
          color="primary"
          sx={{ height: "24px" }} // Set height to match TextField
        >
          Add Patient
        </Button>
      </Box>
      <Box sx={{ padding: 4, backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
        {/* <Typography
        variant="h6"
        sx={{ marginBottom: 2, fontWeight: "bold", color: "#1976d2" }}
      >
        Patient List
      </Typography> */}

        {patients.length ? (
          <>
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
                        <TableCell align="center">
                          {patient.condition}
                        </TableCell>
                        <TableCell align="center" className="w-2">
                          <Box className="flex flex-col my-1 sm:flex-row sm:space-x-2">
                            <Button
                              onClick={() =>
                                navigate(`/patient/${patient._id}`)
                              }
                              variant="outlined"
                              color="info"
                              className="w-full"
                            >
                              View
                            </Button>
                            <Button
                              onClick={() => handleDelete(patient._id)}
                              variant="outlined"
                              color="error"
                              className="w-full"
                            >
                              Delete
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center"></TableCell>
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
          </>
        ) : (
          <Typography align="center">No patients found...</Typography>
        )}

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
    </>
  );
};

export default PatientList;
