import React, { useState } from "react";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  TextField,
  Typography,
  Alert,
  Paper,
  Box,
} from "@mui/material";
import { addPatient } from "../../services/apiService";

const PatientProfile = () => {
  // State for patient details and histories
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    condition: "",
    medicalHistory: [],
    medicationHistory: [],
    labResults: [],
    treatmentPlan: [],
  });

  // State for dialog forms
  const [showMedicalHistoryForm, setShowMedicalHistoryForm] = useState(false);
  const [showMedicationForm, setShowMedicationForm] = useState(false);
  const [showLabResultForm, setShowLabResultForm] = useState(false);
  const [showTreatmentForm, setShowTreatmentForm] = useState(false);

  // Snackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // State for input fields
  const [newMedicalHistory, setNewMedicalHistory] = useState({
    diagnosis: "",
    date: "",
    doctor: "",
  });
  const [newMedication, setNewMedication] = useState({
    medication: "",
    dosage: "",
    startDate: "",
    endDate: "",
    prescribingDoctor: "",
  });
  const [newLabResult, setNewLabResult] = useState({
    testName: "",
    result: "",
    date: "",
    notes: "",
  });
  const [newTreatment, setNewTreatment] = useState({
    treatment: "",
    doctor: "",
    startDate: "",
    endDate: "",
    notes: "",
  });

  // Handle adding medical history
  const handleAddMedicalHistory = () => {
    setFormData((prevData) => ({
      ...prevData,
      medicalHistory: [...prevData.medicalHistory, newMedicalHistory],
    }));
    setNewMedicalHistory({ diagnosis: "", date: "", doctor: "", notes: "" });
    setShowMedicalHistoryForm(false);
    setSnackbarMessage("Medical history added successfully!");
    setOpenSnackbar(true);
  };

  // Handle adding medication
  const handleAddMedication = () => {
    setFormData((prevData) => ({
      ...prevData,
      medicationHistory: [...prevData.medicationHistory, newMedication],
    }));
    setNewMedication({
      medication: "",
      dosage: "",
      startDate: "",
      endDate: "",
      prescribingDoctor: "",
      notes: "",
    });
    setShowMedicationForm(false);
    setSnackbarMessage("Medication history added successfully!");
    setOpenSnackbar(true);
  };

  // Handle adding lab result
  const handleAddLabResult = () => {
    setFormData((prevData) => ({
      ...prevData,
      labResults: [...prevData.labResults, newLabResult],
    }));
    setNewLabResult({ testName: "", result: "", date: "", notes: "" });
    setShowLabResultForm(false);
    setSnackbarMessage("Lab result added successfully!");
    setOpenSnackbar(true);
  };

  // Handle adding treatment plan
  const handleAddTreatment = () => {
    setFormData((prevData) => ({
      ...prevData,
      treatmentPlan: [...prevData.treatmentPlan, newTreatment],
    }));
    setNewTreatment({
      treatment: "",
      doctor: "",
      startDate: "",
      endDate: "",
      notes: "",
    });
    setShowTreatmentForm(false);
    setSnackbarMessage("Treatment plan added successfully!");
    setOpenSnackbar(true);
  };

  // Handle snackbar close
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await addPatient(formData, token);
      if (response) {
        const token = response.token; // Extract the token from the response

        // Save the token to localStorage
        localStorage.setItem("token", token);

        setSnackbarMessage("Patent added successfully!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);

        // Redirect after setting the token (e.g., to dashboard)
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        throw new Error("Failed to add patient");
      }
    } catch (error) {
      console.error(error);
      setSnackbarMessage(error?.response?.data?.message || error.message);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <Container>
      <Paper sx={{ padding: 4, marginBottom: 4 }}>
        <Typography variant="h4" gutterBottom>
          Patient Profile
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Age"
            type="number"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Condition"
            value={formData.condition}
            onChange={(e) =>
              setFormData({ ...formData, condition: e.target.value })
            }
            margin="normal"
            required
          />
          <Box className="flex flex-col my-3 sm:flex-row sm:space-x-4">
            <Button
              variant="outlined"
              onClick={() => setShowMedicalHistoryForm(true)}
              className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white w-full px-4 py-2 rounded leading-normal text-base"
            >
              Add Medical History
            </Button>
            <Button
              variant="outlined"
              onClick={() => setShowMedicationForm(true)}
              className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white w-full px-4 py-2 rounded leading-normal text-base"
            >
              Add Medication History
            </Button>
            <Button
              variant="outlined"
              onClick={() => setShowLabResultForm(true)}
              className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white w-full px-4 py-2 rounded leading-normal text-base"
            >
              Add Lab Result
            </Button>
            <Button
              variant="outlined"
              onClick={() => setShowTreatmentForm(true)}
              className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white w-full px-4 py-2 rounded leading-normal text-base"
            >
              Add Treatment Plan
            </Button>
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: "100%", marginRight: 1 }}
          >
            Add Patient
          </Button>
        </form>
      </Paper>

      {/* Display Medical History */}
      {!!formData.medicalHistory.length && (
        <>
          <Typography variant="h6" gutterBottom>
            Medical History
          </Typography>
          <List>
            {formData.medicalHistory.map((history, index) => (
              <ListItem
                key={`${(index + Math.round()).toString().replace(".", "")}`}
              >
                <ListItemText
                  primary={`Diagnosis: ${history.diagnosis} | Doctor: ${history.doctor}`}
                  secondary={`Date: ${new Date(
                    history.date
                  ).toLocaleDateString()} | Notes: ${history.notes}`}
                />
              </ListItem>
            ))}
          </List>
        </>
      )}

      {/* Display Medication History */}
      {!!formData.medicationHistory.length && (
        <>
          <Typography variant="h6" gutterBottom>
            Medication History
          </Typography>
          <List>
            {formData.medicationHistory.map((medication, index) => (
              <ListItem
                key={`${(index + Math.round()).toString().replace(".", "")}`}
              >
                <ListItemText
                  primary={`Medication: ${medication.medication} | Dosage: ${medication.dosage}`}
                  secondary={`Prescribing Doctor: ${
                    medication.prescribingDoctor
                  } | Start: ${new Date(
                    medication.startDate
                  ).toLocaleDateString()} | End: ${new Date(
                    medication.endDate
                  ).toLocaleDateString()} | Notes: ${medication.notes}`}
                />
              </ListItem>
            ))}
          </List>
        </>
      )}

      {/* Display Lab Results */}
      {!!formData?.labResults?.length && (
        <>
          <Typography variant="h6" gutterBottom>
            Lab Results
          </Typography>
          <List>
            {formData.labResults.map((result, index) => (
              <ListItem
                key={`${(index + Math.round()).toString().replace(".", "")}`}
              >
                <ListItemText
                  primary={`Test: ${result.testName} | Result: ${result.result}`}
                  secondary={`Date: ${new Date(
                    result.date
                  ).toLocaleDateString()} | Notes: ${result.notes}`}
                />
              </ListItem>
            ))}
          </List>
        </>
      )}

      {/* Display Treatment Plans */}
      {!!formData.treatmentPlan.length && (
        <>
          <Typography variant="h6" gutterBottom>
            Treatment Plans
          </Typography>
          <List>
            {formData.treatmentPlan.map((treatment, index) => (
              <ListItem
                key={`${(index + Math.round()).toString().replace(".", "")}`}
              >
                <ListItemText
                  primary={`Treatment: ${treatment.treatment} | Doctor: ${treatment.doctor}`}
                  secondary={`Start: ${new Date(
                    treatment.startDate
                  ).toLocaleDateString()} | End: ${new Date(
                    treatment.endDate
                  ).toLocaleDateString()} | Notes: ${treatment.notes}`}
                />
              </ListItem>
            ))}
          </List>
        </>
      )}

      {/* Snackbar for success messages */}
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

      {/* Medical History Dialog */}
      <Dialog
        open={showMedicalHistoryForm}
        onClose={() => setShowMedicalHistoryForm(false)}
      >
        <DialogTitle>Add Medical History</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Diagnosis"
            value={newMedicalHistory.diagnosis}
            onChange={(e) =>
              setNewMedicalHistory({
                ...newMedicalHistory,
                diagnosis: e.target.value,
              })
            }
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Date"
            type="date"
            value={newMedicalHistory.date}
            onChange={(e) =>
              setNewMedicalHistory({
                ...newMedicalHistory,
                date: e.target.value,
              })
            }
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            fullWidth
            label="Doctor"
            value={newMedicalHistory.doctor}
            onChange={(e) =>
              setNewMedicalHistory({
                ...newMedicalHistory,
                doctor: e.target.value,
              })
            }
            margin="normal"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowMedicalHistoryForm(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddMedicalHistory}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Medication Dialog */}
      <Dialog
        open={showMedicationForm}
        onClose={() => setShowMedicationForm(false)}
      >
        <DialogTitle>Add Medication</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Medication"
            value={newMedication.medication}
            onChange={(e) =>
              setNewMedication({ ...newMedication, medication: e.target.value })
            }
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Dosage"
            value={newMedication.dosage}
            onChange={(e) =>
              setNewMedication({ ...newMedication, dosage: e.target.value })
            }
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Start Date"
            type="date"
            value={newMedication.startDate}
            onChange={(e) =>
              setNewMedication({ ...newMedication, startDate: e.target.value })
            }
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            fullWidth
            label="End Date"
            type="date"
            value={newMedication.endDate}
            onChange={(e) =>
              setNewMedication({ ...newMedication, endDate: e.target.value })
            }
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            fullWidth
            label="Prescribing Doctor"
            value={newMedication.prescribingDoctor}
            onChange={(e) =>
              setNewMedication({
                ...newMedication,
                prescribingDoctor: e.target.value,
              })
            }
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowMedicationForm(false)}>Cancel</Button>
          <Button onClick={handleAddMedication}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Lab Result Dialog */}
      <Dialog
        open={showLabResultForm}
        onClose={() => setShowLabResultForm(false)}
      >
        <DialogTitle>Add Lab Result</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Test Name"
            value={newLabResult.testName}
            onChange={(e) =>
              setNewLabResult({ ...newLabResult, testName: e.target.value })
            }
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Result"
            value={newLabResult.result}
            onChange={(e) =>
              setNewLabResult({ ...newLabResult, result: e.target.value })
            }
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Date"
            type="date"
            value={newLabResult.date}
            onChange={(e) =>
              setNewLabResult({ ...newLabResult, date: e.target.value })
            }
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            fullWidth
            label="Notes"
            value={newLabResult.notes}
            onChange={(e) =>
              setNewLabResult({ ...newLabResult, notes: e.target.value })
            }
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowLabResultForm(false)}>Cancel</Button>
          <Button onClick={handleAddLabResult}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Treatment Plan Dialog */}
      <Dialog
        open={showTreatmentForm}
        onClose={() => setShowTreatmentForm(false)}
      >
        <DialogTitle>Add Treatment Plan</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Treatment"
            value={newTreatment.treatment}
            onChange={(e) =>
              setNewTreatment({ ...newTreatment, treatment: e.target.value })
            }
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Doctor"
            value={newTreatment.doctor}
            onChange={(e) =>
              setNewTreatment({ ...newTreatment, doctor: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Start Date"
            type="date"
            value={newTreatment.startDate}
            onChange={(e) =>
              setNewTreatment({ ...newTreatment, startDate: e.target.value })
            }
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            fullWidth
            label="End Date"
            type="date"
            value={newTreatment.endDate}
            onChange={(e) =>
              setNewTreatment({ ...newTreatment, endDate: e.target.value })
            }
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            fullWidth
            label="Notes"
            value={newTreatment.notes}
            onChange={(e) =>
              setNewTreatment({ ...newTreatment, notes: e.target.value })
            }
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowTreatmentForm(false)}>Cancel</Button>
          <Button onClick={handleAddTreatment}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PatientProfile;
