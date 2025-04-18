import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import "../styles/Login.css"; // Import the CSS file for styling

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state for login failure

  const navigate = useNavigate(); // useNavigate hook for navigation

  // Handle input changes for email and password fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (called when user clicks "Login")
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh on form submission
    setLoading(true); // Show loading indicator

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login", // Your backend login API endpoint
        formData, // Send the form data (email & password)
        { withCredentials: true } // Include credentials (cookies) if necessary
      );
      localStorage.setItem("userToken", response.data.token); // Store the received token in localStorage
      alert("Login successful!"); // Show success message
      navigate("/dashboard"); // Redirect to dashboard after successful login
    } catch (error) {
      // Handle login failure
      console.error("Error logging in", error);
      setError(error.response?.data?.error || "Login failed."); // Display error message
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        {error && <p>{error}</p>} {/* Display error message if there's any */}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange} // Update form data on input change
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange} // Update form data on input change
            required
          />
          <button type="submit" disabled={loading}> {/* Disable the button if loading */}
            {loading ? "Logging in..." : "Login"} {/* Show loading text while processing */}
          </button>
        </form>
        <div className="login-footer">
          <p>Don't have an account? <a href="/register">Register</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
