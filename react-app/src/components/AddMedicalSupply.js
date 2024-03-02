// AddMedicalSupply.js

import React, { useState } from "react";
import { addMedicalSupply } from "../api/api";

const AddMedicalSupply = () => {
  const [medicalSupplyData, setMedicalSupplyData] = useState({
    genericId: "",
    itemName: "", // Added field
    itemDescription: "", // Added field
    // Include any other fields that your backend expects
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMedicalSupplyData({
      ...medicalSupplyData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if all required fields are present
      if (
        !medicalSupplyData.genericId ||
        !medicalSupplyData.itemName ||
        !medicalSupplyData.itemDescription
      ) {
        console.error("Missing required fields");
        return;
      }

      const response = await addMedicalSupply(medicalSupplyData);
      console.log(response);
      // Clear form fields after successful submission
      setMedicalSupplyData({
        genericId: "",
        itemName: "",
        itemDescription: "",
      });
    } catch (error) {
      console.error("Error adding medical supply:", error);
    }
  };

  return (
    <div>
      <h2>Add New Medical Supply</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="genericId" className="form-label">
            Generic ID
          </label>
          <input
            type="text"
            className="form-control"
            id="genericId"
            name="genericId"
            value={medicalSupplyData.genericId}
            onChange={handleInputChange}
          />
          <div className="mb-3">
            <label htmlFor="itemName" className="form-label">
              Item Name
            </label>
            <input
              type="text"
              className="form-control"
              id="itemName"
              name="itemName"
              value={medicalSupplyData.itemName}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="itemDescription" className="form-label">
              Item Description
            </label>
            <input
              type="text"
              className="form-control"
              id="itemDescription"
              name="itemDescription"
              value={medicalSupplyData.itemDescription}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Medical Supply
        </button>
      </form>
    </div>
  );
};

export default AddMedicalSupply;
