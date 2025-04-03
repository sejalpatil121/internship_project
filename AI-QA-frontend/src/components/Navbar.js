import React from "react";
import { Link } from "react-router-dom";
import '../App.css';



const Navbar = () => {
  return (
    <nav>
      <Link to="/">Login</Link> | 
      <Link to="/register">Register</Link> | 
      <Link to="/dashboard">Dashboard</Link> | 
      <Link to="/admin">Admin</Link>
    </nav>
  );
};

export default Navbar;
