
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:3000/api/auth/admin-login", {
        email,
        password,
      });
      localStorage.setItem("adminToken", response.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to login. Please try again.");
    }
  };

  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      minHeight: "100vh",
      backgroundColor: "#F1F0FB",
      fontFamily: "sans-serif"
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "40px",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "400px",
        margin: "20px"
      }}>
        <h1 style={{ 
          textAlign: "center", 
          color: "#1A1F2C", 
          marginBottom: "30px",
          fontSize: "2rem"
        }}>Admin Login</h1>
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ color: "#403E43", fontSize: "16px" }}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                padding: "12px",
                borderRadius: "5px",
                border: "1px solid #D6BCFA",
                fontSize: "16px"
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ color: "#403E43", fontSize: "16px" }}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                padding: "12px",
                borderRadius: "5px",
                border: "1px solid #D6BCFA",
                fontSize: "16px"
              }}
            />
          </div>
          {error && <p style={{ color: "#ea384c", margin: "0" }}>{error}</p>}
          <button
            type="submit"
            style={{
              backgroundColor: "#9b87f5",
              color: "white",
              padding: "12px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              marginTop: "10px",
              transition: "background-color 0.3s"
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
