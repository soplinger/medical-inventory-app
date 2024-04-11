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
        <div className="col-md-6 text-center">
          <h1>Welcome to Our Application</h1>
          <p>Please login or register to continue</p>
          <Link to="/login" className="btn btn-primary m-2">
            Login
          </Link>
          {/* Add a link to the Register component 
          <Link to="/register" className="btn btn-secondary m-2">
            Register
          </Link>
          */}
        </div>
      </div>
    </div>
  );
}

export default Welcome;