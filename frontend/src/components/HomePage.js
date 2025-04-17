
import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-custom-bg p-8 text-center font-sans">
      <div className="mx-auto max-w-2xl bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-custom-text mb-6">Welcome to the Application</h1>
        <p className="text-lg text-gray-600 mb-8">Select an option to navigate:</p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/register">
            <button className="bg-custom-purple hover:bg-custom-purple-dark text-white px-6 py-2 rounded-md transition-colors">
              Register
            </button>
          </Link>
          <Link to="/login">
            <button className="bg-custom-purple hover:bg-custom-purple-dark text-white px-6 py-2 rounded-md transition-colors">
              User Login
            </button>
          </Link>
          <Link to="/profile">
            <button className="bg-custom-purple hover:bg-custom-purple-dark text-white px-6 py-2 rounded-md transition-colors">
              User Profile
            </button>
          </Link>
          <Link to="/admin/login">
            <button className="bg-custom-purple hover:bg-custom-purple-dark text-white px-6 py-2 rounded-md transition-colors">
              Admin Login
            </button>
          </Link>
          <Link to="/admin/dashboard">
            <button className="bg-custom-purple hover:bg-custom-purple-dark text-white px-6 py-2 rounded-md transition-colors">
              Admin Dashboard
            </button>
          </Link>
          <Link to="/ask">
            <button className="bg-custom-purple hover:bg-custom-purple-dark text-white px-6 py-2 rounded-md transition-colors">
              Ask a Question
            </button>
          </Link>
        </div>
      </div>
     
    </div>
    
  );
};

export default HomePage;
