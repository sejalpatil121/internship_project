import React from "react";
import { Link } from "react-router-dom";
import "../styles/AdminDashboard.css"; // Import the CSS file

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="sidebar-title">Admin Dashboard</h2>
        <ul className="sidebar-nav">
          <li>
            <Link to="/admin/dashboard" className="sidebar-link">Overview</Link>
          </li>
          <li>
            <Link to="/admin/users" className="sidebar-link">User Management</Link>
          </li>
          <li>
            <Link to="/admin/settings" className="sidebar-link">Settings</Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Navigation Bar */}
        <div className="top-nav">
          <h1>Welcome, Admin</h1>
          <div className="user-info">
            <span>Admin</span>
            <button>Logout</button>
          </div>
        </div>

        {/* Dashboard Overview */}
        <div className="overview">
          <h2>Dashboard Overview</h2>
          <div className="overview-stats">
            <div className="stat-box">
              <h3>Total Users</h3>
              <p>150</p>
            </div>
            <div className="stat-box">
              <h3>Active Users</h3>
              <p>120</p>
            </div>
            <div className="stat-box">
              <h3>Pending Requests</h3>
              <p>5</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
