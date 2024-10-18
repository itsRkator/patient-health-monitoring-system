import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/AUth/Login";
import Signup from "./components/AUth/Singup";
import Navbar from "./Shared/Navbar";
import CreateAuthorization from "./components/Authorization/CreateAuthorization";
import AuthorizationList from "./components/Authorization/GetAuthorizationList";
import Dashboard from "./components/Dashboard";
import AddPatient from "./components/Patients/AddPatient";
import PatientDetail from "./components/Patients/PatientDetail";

const App = () => {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Router>
      <Navbar />
      <div className="container mt-2">
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={isLoggedIn ? <Navigate to="/" /> : <Signup />}
          />
          <Route
            path="/authorization/:id"
            element={
              isLoggedIn ? <CreateAuthorization /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/authorization"
            element={
              isLoggedIn ? <CreateAuthorization /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/authorizations/:id"
            element={
              isLoggedIn ? <AuthorizationList /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/add-patient"
            element={isLoggedIn ? <AddPatient /> : <Navigate to="/login" />}
          />
          <Route
            path="/patient/:id"
            element={isLoggedIn ? <PatientDetail /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
