/*****************************************************************
 * Author: Sean Oplinger
 * Date: 4/10/2024
 * Register.js
 * Description: Registeration page for the React client.
 *****************************************************************/

import React, { useState } from "react";
import { registerUser } from "../api/api";
import { useNavigate } from "react-router-dom"; // Import useHistory

function Register() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [role, setRole] = useState(""); // Define role state
  const navigate = useNavigate(); // Initialize useHistory

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser({
        password,
        email,
        first,
        last,
        role, // Pass additional fields to registerUser function
      });
      console.log(response); // Handle the response appropriately
      // Navigate to login on successful registration
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle the error appropriately in your UI
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="card">
            <div className="card-body">
              <h5 className="card-title mb-4">Account Registration</h5>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="first" className="form-label">
                  First Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="first"
                  value={first}
                  onChange={(e) => setFirst(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="last" className="form-label">
                  Last Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="last"
                  value={last}
                  onChange={(e) => setLast(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="role" className="form-label">
                  Role:
                </label>
                {/* Use either dropdown or autocomplete for role selection */}
                {/* Dropdown Menu */}*{" "}
                <select
                  className="form-select"
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Select Role</option>
                  <option value="Medical Effects and Fabrication Technician">
                    Medical Effects and Fabrication Technician
                  </option>
                  <option value="Simulation Coordinator">
                    Simulation Coordinator
                  </option>
                  <option value="Simulation Education Manager">
                    Simulation Education Manager
                  </option>
                  <option>Student Intern</option>
                  {/* Add other role options as needed */}
                </select>
                {/* Autocomplete */}
                {/* <input
                  type="text"
                  className="form-control"
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  list="roleOptions"
                />
                <datalist id="roleOptions">
                  <option value="Medical Effects and Fabrication Technician" />
                  <option value="Simulation Coordinator" />
                  <option value="Simulation Education Manager" />
                  {/* Add other role options as needed */}
                {/* </datalist> */}
              </div>
              <button type="submit" className="btn btn-primary">
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
