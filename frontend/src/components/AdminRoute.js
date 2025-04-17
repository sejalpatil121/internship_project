import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");

  // Redirect to login if no token is found
  if (!token) {
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export default AdminRoute;