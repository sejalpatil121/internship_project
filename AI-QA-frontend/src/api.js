import axios from "axios";

const API_URL = "http://localhost:3000/api"; // Replace with your actual backend URL

export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/auth/register`, userData);
};

export const loginUser = async (userData) => {
  return await axios.post(`${API_URL}/auth/login`, userData);
};

export const getUserProfile = async (token) => {
  return await axios.get(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const registerAdmin = async (adminData) => {
  return await axios.post(`${API_URL}/auth/register-admin`, adminData);
};

export const loginAdmin = async (adminData) => {
  return await axios.post(`${API_URL}/auth/admin-login`, adminData);
};

export const getAllUsers = async (token) => {
  return await axios.get(`${API_URL}/admin/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getSystemStats = async (token) => {
  return await axios.get(`${API_URL}/admin/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getApiLogs = async (token) => {
  return await axios.get(`${API_URL}/admin/logs`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
