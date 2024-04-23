/*****************************************************************
 * Author: Sean Oplinger
 * Date: 4/10/2024
 * Navigation.js
 * Description: Navigation component for the React client.
 *****************************************************************/

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { logoutUser, isAdmin as checkIfAdmin } from "../api/api";

const Navigation = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogout = async () => {
    await logoutUser(); // Call the logout function
    navigate("/"); // Redirect to the login page after logout
  };

  useEffect(() => {
    const fetchAdminStatus = async () => {
      try {
        const adminStatus = await checkIfAdmin(); // Call your API to check admin status
        setIsAdmin(adminStatus.isAdmin); // Set state based on response
      } catch (error) {
        console.error("Failed to fetch admin status:", error);
      }
    };

    fetchAdminStatus();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Home
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/medical-items" className="nav-link">
                Medical Items
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/add-medical-supply" className="nav-link">
                Add Medical Supply
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/inventory-metrics" className="nav-link">
                Inventory Metrics
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/donations" className="nav-link">
                Donations
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/history" className="nav-link">
                History
              </Link>
            </li>
            {isAdmin && (
              <li className="nav-item">
                <Link to="/admin" className="nav-link">
                  Admin
                </Link>
              </li>
            )}
            <li className="nav-item">
              <button
                onClick={handleLogout}
                className="nav-link btn btn-link"
                style={{ cursor: "pointer" }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navigation;
