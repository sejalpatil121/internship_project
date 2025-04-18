import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AdminLoginPage.css"; // Import the CSS file

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset any previous errors

    try {
      const response = await axios.post("http://localhost:3000/api/auth/admin-login", {
        email,
        password,
      });
      localStorage.setItem("adminToken", response.data.token);
      navigate("/admin/dashboard"); // Redirect to admin dashboard after login
    } catch (err) {
      setError(err.response?.data?.error || "Failed to login. Please try again.");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <h1>Admin Login</h1>
        <form onSubmit={handleLogin}>
          <div className="form-input">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-input">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
