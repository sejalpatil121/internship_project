import React, { useEffect, useState } from "react";
import axios from "axios";
import '../App.css';



const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    axios
      .get("http://localhost:3000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));

    axios
      .get("http://localhost:3000/api/admin/stats", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Error fetching stats:", err));
  }, []);

  return (
    <div>
      <h2>Admin Panel</h2>
      <h3>System Stats:</h3>
      <p>Total Users: {stats.totalUsers}</p>
      <p>API Calls: {stats.apiCalls}</p>

      <h3>Users:</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.username} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
