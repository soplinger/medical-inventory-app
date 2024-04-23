/*****************************************************************
 * Author: Sean Oplinger
 * Date: 4/10/2024
 * App.js
 * Description: Main entry point for the React client.
 *****************************************************************/

import React from "react";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import Donations from "./components/Donations";
import History from "./components/History";
import Admin from "./components/Admin";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MedicalItems from "./components/MedicalItems";
import AddMedicalSupply from "./components/AddMedicalSupply"; // Import the AddMedicalSupply
import Metrics from "./components/Metrics"; // Import the Metrics component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/medical-items" element={<MedicalItems />} />
        <Route path="/add-medical-supply" element={<AddMedicalSupply />} />{" "}
        <Route path="/inventory-metrics" element={<Metrics />} />{" "}
        <Route path="/donations" element={<Donations />} />
        <Route path="/history" element={<History />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
