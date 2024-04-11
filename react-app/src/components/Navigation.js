/*****************************************************************
 * Author: Sean Oplinger
 * Date: 4/10/2024
 * Navigation.js
 * Description: Navigation component for the React client.
 *****************************************************************/

import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => (
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
          {/* Add more navigation links as needed */}
        </ul>
      </div>
    </div>
  </nav>
);

export default Navigation;
