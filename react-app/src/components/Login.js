/*****************************************************************
 * Author: Sean Oplinger
 * Date: 4/10/2024
 * Login.js
 * Description: Login component
 *****************************************************************/

import React, { useState } from "react";
import { loginUser } from "../api/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({
        email,
        password,
      });
      // Assuming the token is in the response body under the key 'token'
      const token = response.token;
      localStorage.setItem("userToken", token);
      console.log("Login successful");
      navigate("/medical-items");
      // Redirect user or update UI as logged in
    } catch (error) {
      console.error("Login failed:", error);
      // Handle error (e.g., show login error message)
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="card">
            <div className="card-body">
              <h5 className="card-title mb-4">Login</h5>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
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
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
