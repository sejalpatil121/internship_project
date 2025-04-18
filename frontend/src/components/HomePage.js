import React from "react";
import { Link } from "react-router-dom";
import "../styles/HomePage.css"; // If CSS is in the 'styles' folder

const HomePage = () => {
  return (
    <div className="homepage-container">
      <div className="homepage-box">
        <h1 className="homepage-title">Welcome to URL Analyzer</h1>
        <p className="homepage-subtitle">
          The ultimate tool for analyzing, managing, and optimizing your URLs.
        </p>

        <div className="button-grid">
          <Link to="/register">
            <button className="custom-button">Create an Account</button>
          </Link>
          <Link to="/login">
            <button className="custom-button">Login</button>
          </Link>
          <Link to="/profile">
            <button className="custom-button">Your Profile</button>
          </Link>
          <Link to="/admin/login">
            <button className="custom-button">Admin Login</button>
          </Link>
          <Link to="/admin/dashboard">
            <button className="custom-button">Admin Dashboard</button>
          </Link>
          <Link to="/ask">
            <button className="custom-button">Ask a Question</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
