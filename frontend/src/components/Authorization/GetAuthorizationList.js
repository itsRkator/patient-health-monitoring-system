import React, { useEffect, useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  getAuthorizationRequests,
  updateAuthorizationRequests,
} from "../../services/apiService";
import { useParams } from "react-router-dom";

const AuthorizationList = () => {
  const { id: userId } = useParams();
  const token = localStorage.getItem("token");
  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(1); // Starting from page 1
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  // Snackbar states
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const sortRequests = (requests) =>
    requests.sort((a, b) => {
      if (a.status !== "pending" && b.status === "pending") {
        return 1;
      } else {
        return -1;
      }
    });
  useEffect(() => {
    const fetchRequests = async () => {
      const data = await getAuthorizationRequests(userId, token, {
        page,
        limit: rowsPerPage,
      });
      setRequests(() => sortRequests(data.requests));
      setTotalPages(data.totalPages);
    };

    fetchRequests();
  }, [page, rowsPerPage, token, userId]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1); // newPage is 0-indexed, so add 1 for the API
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1); // Reset page to 1 when changing rows per page
  };

  // const handleDelete = async (requestId) => {};

  const handleRequestApprove = async (requestId) => {
    try {
      const response = await updateAuthorizationRequests(requestId, token);
      if (response) {
        const updatedRequests = requests.map((request) =>
          request._id === requestId
            ? { ...request, status: "approved" }
            : request
        );
        setRequests(() => sortRequests(updatedRequests));
        setSnackbarMessage("Authorization Approved successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } else {
        setSnackbarMessage("Failed ot approve request");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarMessage(error.message);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <Typography variant="h4" className="text-center mb-6 text-blue-600">
        Authorization Requests
      </Typography>

      {requests.length === 0 ? (
        <Typography variant="body1" className="text-gray-500 text-center">
          No requests available.
        </Typography>
      ) : (
        <>
          <TableContainer
            component={Paper}
            sx={{ boxShadow: 3, borderRadius: "8px" }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Treatment Type
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Insurance Plan
                  </TableCell>

                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Date Requested
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Status
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request._id}>
                    <TableCell align="center">
                      {request.treatmentType}
                    </TableCell>
                    <TableCell align="center">
                      {request.insurancePlan}
                    </TableCell>
                    <TableCell align="center">
                      {new Date(request.dateRequested).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="center">{request.status}</TableCell>
                    <TableCell align="center">
                      <Box className="flex flex-col sm:flex-row sm:space-x-2">
                        {request.status === "pending" ? (
                          <Button
                            onClick={() => handleRequestApprove(request._id)}
                            variant="outlined"
                            color="info"
                            className="w-full"
                          >
                            Approve
                          </Button>
                        ) : (
                          <span>Approved</span>
                        )}
                        {/* <Button
                          onClick={() => handleDelete(request._id)}
                          variant="outlined"
                          color="error"
                          className="w-full"
                        >
                          Delete
                        </Button> */}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalPages * rowsPerPage} // Use total pages multiplied by rows per page
            rowsPerPage={rowsPerPage}
            page={page - 1} // Page is 1-indexed, convert it to 0-indexed for TablePagination
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ marginTop: 2 }}
          />
        </>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AuthorizationList;
