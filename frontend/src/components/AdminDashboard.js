
import React, { useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const token = localStorage.getItem("adminToken");

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/admin/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats", error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", color: "#1A1F2C", marginBottom: "30px", fontSize: "2rem" }}>Admin Dashboard</h1>
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px", justifyContent: "center" }}>
        <button
          onClick={fetchUsers}
          style={{
            backgroundColor: "#9b87f5",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s",
            fontSize: "16px"
          }}
        >
          Get All Users
        </button>
        <button
          onClick={fetchStats}
          style={{
            backgroundColor: "#7E69AB",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s",
            fontSize: "16px"
          }}
        >
          Get System Stats
        </button>
      </div>
      <div style={{ marginBottom: "30px", backgroundColor: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
        <h2 style={{ color: "#1A1F2C", marginBottom: "15px", fontSize: "1.5rem" }}>Users</h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {users.map((user) => (
            <li
              key={user.id}
              style={{
                padding: "12px",
                backgroundColor: "#F1F0FB",
                marginBottom: "8px",
                borderRadius: "4px",
                color: "#403E43"
              }}
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
        <h2 style={{ color: "#1A1F2C", marginBottom: "15px", fontSize: "1.5rem" }}>System Stats</h2>
        {stats && (
          <div style={{ display: "grid", gap: "10px" }}>
            <p style={{ margin: 0, padding: "10px", backgroundColor: "#E5DEFF", borderRadius: "4px", color: "#403E43" }}>
              Active Users: {stats.activeUsers}
            </p>
            <p style={{ margin: 0, padding: "10px", backgroundColor: "#E5DEFF", borderRadius: "4px", color: "#403E43" }}>
              Total Requests: {stats.totalRequests}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
