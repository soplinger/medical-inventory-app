import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import MedicalItems from "./components/MedicalItems";
import Navigation from "./components/Navigation"; // Import the Navigation component
import AddMedicalSupply from "./components/AddMedicalSupply"; // Import the AddMedicalSupply component

function App() {
  return (
    <Router>
      <Navigation /> {/* Include the Navigation component */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/medical-items" element={<MedicalItems />} />
        <Route path="/add-medical-supply" element={<AddMedicalSupply />} />{" "}
      </Routes>
    </Router>
  );
}

export default App;
