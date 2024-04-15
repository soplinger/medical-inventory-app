/*****************************************************************
 * Author: Sean Oplinger
 * Date: 4/10/2024
 * Welcome.js
 * Description: Welcome page component
 *****************************************************************/

import React from "react";
import { Link } from "react-router-dom";

function Welcome() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body text-center">
              <h1 className="card-title">Welcome to St. Luke's Inventory</h1>
              <p className="card-text">Please login to manage the medical inventory.</p>
              <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <Link to="/login" className="btn btn-primary btn-lg px-4">
                  <i className="bi bi-box-arrow-in-right"></i> Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
