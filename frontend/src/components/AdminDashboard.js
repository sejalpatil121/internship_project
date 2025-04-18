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
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={fetchUsers}>Get All Users</button>
      <button onClick={fetchStats}>Get System Stats</button>
      <div>
        <h2>Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>System Stats</h2>
        {stats && (
          <div>
            <p>Active Users: {stats.activeUsers}</p>
            <p>Total Requests: {stats.totalRequests}</p>
          </div>
        )}
      </div>
    </div>
  );
};




export default AdminDashboard; 