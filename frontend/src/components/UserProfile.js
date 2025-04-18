import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/UserProfile.css"; // Import the CSS for styling

const UserProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("userToken");
      try {
        const response = await axios.get("http://localhost:3000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile", error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-box">
        <h1>User Profile</h1>
        {profile ? (
          <div className="profile-details">
            <p><strong>Username:</strong> {profile.username}</p>
            <p><strong>Email:</strong> {profile.email}</p>
          </div>
        ) : (
          <p className="loading-message">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
