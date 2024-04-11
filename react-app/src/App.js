/*****************************************************************
 * Author: Sean Oplinger
 * Date: 4/10/2024
 * App.js
 * Description: Main entry point for the React client.
 *****************************************************************/

import React from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Welcome from "./components/Welcome";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import MedicalItems from "./components/MedicalItems";
import Navigation from "./components/Navigation"; // Import the Navigation component
import AddMedicalSupply from "./components/AddMedicalSupply"; // Import the AddMedicalSupply component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/medical-items" element={<MedicalItems />} />
        <Route path="/add-medical-supply" element={<AddMedicalSupply />} />{" "}
      </Routes>
    </Router>
  );
}

export default App;
