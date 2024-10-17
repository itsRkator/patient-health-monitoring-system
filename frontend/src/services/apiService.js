import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_BASE_URL}/api`;

export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/login`, userData);
  return response.data;
};

export const signupUser = async (userData) => {
  console.log(userData);
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

export const getPatients = async (token, params) => {
  const response = await axios.get(`${API_URL}/patients`, {
    headers: { Authorization: `Bearer ${token}` },
    params,
  });
  return response.data;
};

export const addPatient = async (patientData, token) => {
  const response = await axios.post(`${API_URL}/patients`, patientData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updatePatient = async (id, patientData, token) => {
  const response = await axios.put(`${API_URL}/patients/${id}`, patientData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deletePatient = async (id, token) => {
  const response = await axios.delete(`${API_URL}/patients/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createAuthorizationRequest = async (requestData, token) => {
  const response = await axios.post(`${API_URL}/authorization`, requestData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getAuthorizationRequests = async (token) => {
  const response = await axios.get(`${API_URL}/authorization`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
