import React from "react";
import {
  BrowserRouter as Router,
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

const App = () => {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Router>
      <Navbar />
      <div className="container mx-auto mt-4">
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
            path="/authorization"
            element={
              isLoggedIn ? <CreateAuthorization /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/authorization-requests"
            element={
              isLoggedIn ? <AuthorizationList /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/add-patient"
            element={isLoggedIn ? <AddPatient /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
