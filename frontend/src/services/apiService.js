import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_BASE_URL}/api`;

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Function to handle token expiration
const handleTokenExpiration = async () => {
  try {
    const response = await axiosInstance.post("/auth/refresh", {
      token: localStorage.getItem("refreshToken"),
    });
    const token = response.data.accessToken;
    localStorage.setItem("token", token);
    return token; // Return the new token
  } catch (error) {
    console.error("Failed to refresh token", error);
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    return null; // Return null if token refresh fails
  }
};

// Function to set the Authorization header
const setAuthorizationHeader = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

// Function to handle API requests with error handling
const handleApiRequest = async (requestFunction, ...args) => {
  try {
    const response = await requestFunction(...args); // Retry with new token
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      const newToken = await handleTokenExpiration();
      if (newToken) {
        setAuthorizationHeader(newToken);
        const response = await requestFunction(...args); // Retry with new token
        return response.data;
      }
    }
    throw error; // Rethrow if not a 401 or if refresh failed
  }
};

// Login User
export const loginUser = async (userData) => {
  const response = await axiosInstance.post("/auth/login", userData);
  return response.data;
};

// Signup User
export const signupUser = async (userData) => {
  const response = await axiosInstance.post("/auth/register", userData);
  return response.data;
};

// Get Patients
export const getPatients = async (token, params) => {
  setAuthorizationHeader(token);
  return handleApiRequest(() => axiosInstance.get("/patients", { params }));
};

// Get Patient
export const getPatient = async (id, token) => {
  setAuthorizationHeader(token);
  return handleApiRequest(() => axiosInstance.get(`/patients/${id}`));
};

// Add Patient
export const addPatient = async (patientData, token) => {
  setAuthorizationHeader(token);
  return handleApiRequest(() => axiosInstance.post("/patients", patientData));
};

// Update Patient
export const updatePatient = async (id, patientData, token) => {
  setAuthorizationHeader(token);
  return handleApiRequest(() =>
    axiosInstance.put(`/patients/${id}`, patientData)
  );
};

// Delete Patient
export const deletePatient = async (id, token) => {
  setAuthorizationHeader(token);
  return handleApiRequest(() => axiosInstance.delete(`/patients/${id}`));
};

// Create Authorization Request
export const createAuthorizationRequest = async (requestData, token) => {
  setAuthorizationHeader(token);
  return handleApiRequest(() =>
    axiosInstance.post("/authorization", requestData)
  );
};

// Get Authorization Requests
export const getAuthorizationRequests = async (id, token, params) => {
  setAuthorizationHeader(token);
  return handleApiRequest(() =>
    axiosInstance.get(`/authorization/${id}`, { params })
  );
};

// Update Authorization Request
export const updateAuthorizationRequests = async (id, token) => {
  setAuthorizationHeader(token);
  return handleApiRequest(() => axiosInstance.put(`/authorization/${id}`));
};
