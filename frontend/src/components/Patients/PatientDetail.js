import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  Snackbar,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Button,
  Box, // Import Button
} from "@mui/material";
import { getPatient } from "../../services/apiService";

const PatientDetails = () => {
  const navigator = useNavigate();
  const { id } = useParams(); // Get patient ID from URL
  const token = localStorage.getItem("token");
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await getPatient(id, token);
        if (response) {
          setPatient(response);
          setSnackbarMessage("Patient details fetched successfully");
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
          setLoading(false);
        }
      } catch (error) {
        setSnackbarMessage("Failed to load patient data");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        setLoading(false);
      }
    };
    fetchPatient();
  }, [id, token]);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return <CircularProgress className="mx-auto mt-4" />;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {patient && (
        <>
          {/* Add the button for prior authorization */}

          <Card className="mb-4 shadow-lg rounded-lg bg-white">
            <CardContent>
              <Typography
                variant="h4"
                className="font-bold text-center text-gray-800 mb-2"
              >
                {patient.name}
              </Typography>
              <div className="flex flex-col justify-between my-1 sm:flex-row sm:space-x-2 p-2">
                <Typography className="font-medium">
                  Age: {patient.age}
                </Typography>
                <Typography className="font-medium">
                  Condition: {patient.condition}
                </Typography>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col justify-between sm:flex-row sm:space-x-2 p-2">
            <Typography className="font-medium">
              <Box display="flex" justifyContent="flex-end" alignItems="end">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigator(`/authorizations/${id}`)}
                  className="mb-2"
                >
                  View Prior Authorizations
                </Button>
              </Box>
            </Typography>
            <Typography className="font-medium">
              <Box display="flex" justifyContent="flex-end" alignItems="end">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigator(`/authorization/${id}`)}
                  className="mb-2"
                >
                  Initiate Prior Authorization
                </Button>
              </Box>
            </Typography>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            {/* Medical History */}
            <div className="mb-4">
              <Typography variant="h5" className="font-semibold">
                Medical History
              </Typography>
              {patient.medicalHistory.length > 0 ? (
                <TableContainer>
                  <Table className="min-w-full mt-2">
                    <TableHead>
                      <TableRow>
                        <TableCell className="font-bold">Diagnosis</TableCell>
                        <TableCell className="font-bold">Date</TableCell>
                        <TableCell className="font-bold">Doctor</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {patient.medicalHistory.map((record, index) => (
                        <TableRow
                          key={`${(index + Math.random())
                            .toString()
                            .replace(".", "")}`}
                          className="hover:bg-gray-100 transition-colors"
                        >
                          <TableCell>{record.diagnosis}</TableCell>
                          <TableCell>
                            {new Date(record.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{record.doctor || "N/A"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography>No medical history available.</Typography>
              )}
            </div>

            {/* Medication History */}
            <div className="mb-4">
              <Typography variant="h5" className="font-semibold">
                Medication History
              </Typography>
              {patient.medicationHistory.length > 0 ? (
                <TableContainer>
                  <Table className="min-w-full mt-2">
                    <TableHead>
                      <TableRow>
                        <TableCell className="font-bold">Medication</TableCell>
                        <TableCell className="font-bold">Dosage</TableCell>
                        <TableCell className="font-bold">Start Date</TableCell>
                        <TableCell className="font-bold">End Date</TableCell>
                        <TableCell className="font-bold">
                          Prescribing Doctor
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {patient.medicationHistory.map((medication, index) => (
                        <TableRow
                          key={`${(index + Math.random())
                            .toString()
                            .replace(".", "")}`}
                          className="hover:bg-gray-100 transition-colors"
                        >
                          <TableCell>{medication.medication}</TableCell>
                          <TableCell>{medication.dosage}</TableCell>
                          <TableCell>
                            {new Date(
                              medication.startDate
                            ).toLocaleDateString() || "N/A"}
                          </TableCell>
                          <TableCell>
                            {medication.endDate
                              ? new Date(
                                  medication.endDate
                                ).toLocaleDateString()
                              : "Ongoing"}
                          </TableCell>
                          <TableCell>
                            {medication.prescribingDoctor || "N/A"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography>No medication history available.</Typography>
              )}
            </div>

            {/* Lab Results */}
            <div className="mb-4">
              <Typography variant="h5" className="font-semibold">
                Lab Results
              </Typography>
              {patient.labResults.length > 0 ? (
                <TableContainer>
                  <Table className="min-w-full mt-2">
                    <TableHead>
                      <TableRow>
                        <TableCell className="font-bold">Test Name</TableCell>
                        <TableCell className="font-bold">Result</TableCell>
                        <TableCell className="font-bold">Date</TableCell>
                        <TableCell className="font-bold">Notes</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {patient.labResults.map((result, index) => (
                        <TableRow
                          key={`${(index + Math.random())
                            .toString()
                            .replace(".", "")}`}
                          className="hover:bg-gray-100 transition-colors"
                        >
                          <TableCell>{result.testName}</TableCell>
                          <TableCell>{result.result}</TableCell>
                          <TableCell>
                            {new Date(result.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{result.notes || "N/A"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography>No lab results available.</Typography>
              )}
            </div>

            {/* Treatment Plan */}
            <div className="mb-4">
              <Typography variant="h5" className="font-semibold">
                Treatment Plan
              </Typography>
              {patient.treatmentPlan.length > 0 ? (
                <TableContainer>
                  <Table className="min-w-full mt-2">
                    <TableHead>
                      <TableRow>
                        <TableCell className="font-bold">Treatment</TableCell>
                        <TableCell className="font-bold">Doctor</TableCell>
                        <TableCell className="font-bold">Start Date</TableCell>
                        <TableCell className="font-bold">End Date</TableCell>
                        <TableCell className="font-bold">Notes</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {patient.treatmentPlan.map((treatment, index) => (
                        <TableRow
                          key={`${(index + Math.random())
                            .toString()
                            .replace(".", "")}`}
                          className="hover:bg-gray-100 transition-colors"
                        >
                          <TableCell>{treatment.treatment}</TableCell>
                          <TableCell>{treatment.doctor || "N/A"}</TableCell>
                          <TableCell>
                            {new Date(treatment.startDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            {treatment.endDate
                              ? new Date(treatment.endDate).toLocaleDateString()
                              : "Ongoing"}
                          </TableCell>
                          <TableCell>{treatment.notes || "N/A"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography>No treatment plan available.</Typography>
              )}
            </div>
          </div>
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

export default PatientDetails;
