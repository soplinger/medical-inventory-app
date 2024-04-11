/*****************************************************************
 * Author: Sean Oplinger
 * Date: 4/10/2024
 * AddMedicalSupply.js
 * Description: Page for adding a new medical supply.
 *****************************************************************/

import React, { useState } from "react";
import { addMedicalSupply } from "../api/api";
import Navigation from "./Navigation";

const AddMedicalSupply = () => {
  const [medicalSupplyData, setMedicalSupplyData] = useState({
    name: "", // Assuming this is a new field to be displayed and submitted
    parent: "", // Assuming this is a new field to be displayed and submitted
    genericId: "",
    itemName: "", 
    itemDescription: "",
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
    // Basic validation example
    if (!medicalSupplyData.name || !medicalSupplyData.parent) {
      console.error("Missing required 'name' or 'parent' field");
      return;
    }

    try {
      const response = await addMedicalSupply(medicalSupplyData);
      console.log("Medical supply added:", response);
      // Clear form fields after successful submission
      setMedicalSupplyData({
        name: "", // String input by user
        parent: "", // Likely an ID from a selection or another input mechanism
        genericId: "", // Custom identifier, reset to empty
        itemName: "", // Same as 'name', if different, reset to empty
        itemDescription: "", // Textual description, reset to empty
        alerts: null, // Not typically provided on creation, set to null or its default presentation in UI
        archived: 0, // Default state for new items, assuming non-archived
        code: null, // Unique code if applicable, reset to null or empty string if you're using a form
        img: 1, // Default state indicating the presence of an image; adjust based on actual usage
        notes: "", // Additional notes, reset to empty
        qty: 0, // Quantity, reset to 0 or a suitable default for new items
        ref: null, // Reference code or number, reset to null or empty string
        reo: null, // Reordering code or identifier, reset to null or empty string
        val: 0, // Value or price, reset to 0 or a suitable default
      });
      
    } catch (error) {
      console.error("Error adding medical supply:", error);
    }
  };

  return (
    <div>
      <Navigation /> {/* Include the Navigation component */}
      <h2>Add New Medical Supply</h2>
      <form onSubmit={handleSubmit}>
        {/* Name field */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={medicalSupplyData.name}
            onChange={handleInputChange}
          />
        </div>
        
        {/* Parent field */}
        <div className="mb-3">
          <label htmlFor="parent" className="form-label">Parent ID</label>
          <input
            type="text"
            className="form-control"
            id="parent"
            name="parent"
            value={medicalSupplyData.parent}
            onChange={handleInputChange}
          />
        </div>

        {/* Generic ID field */}
        <div className="mb-3">
          <label htmlFor="genericId" className="form-label">Generic ID</label>
          <input
            type="text"
            className="form-control"
            id="genericId"
            name="genericId"
            value={medicalSupplyData.genericId}
            onChange={handleInputChange}
          />
        </div>

        {/* Item Name field */}
        <div className="mb-3">
          <label htmlFor="itemName" className="form-label">Item Name</label>
          <input
            type="text"
            className="form-control"
            id="itemName"
            name="itemName"
            value={medicalSupplyData.itemName}
            onChange={handleInputChange}
          />
        </div>

        {/* Item Description field */}
        <div className="mb-3">
          <label htmlFor="itemDescription" className="form-label">Item Description</label>
          <textarea
            className="form-control"
            id="itemDescription"
            name="itemDescription"
            value={medicalSupplyData.itemDescription}
            onChange={handleInputChange}
          />
        </div>

        {/* New fields */}
        <div className="mb-3">
          <label htmlFor="alerts" className="form-label">Alerts</label>
          <input
            type="text"
            className="form-control"
            id="alerts"
            name="alerts"
            value={medicalSupplyData.alerts}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="archived" className="form-label">Archived</label>
          <input
            type="number"
            className="form-control"
            id="archived"
            name="archived"
            value={medicalSupplyData.archived}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="code" className="form-label">Code</label>
          <input
            type="text"
            className="form-control"
            id="code"
            name="code"
            value={medicalSupplyData.code}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="img" className="form-label">Image</label>
          <input
            type="number"
            className="form-control"
            id="img"
            name="img"
            value={medicalSupplyData.img}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="notes" className="form-label">Notes</label>
          <textarea
            className="form-control"
            id="notes"
            name="notes"
            value={medicalSupplyData.notes}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="qty" className="form-label">Quantity</label>
          <input
            type="number"
            className="form-control"
            id="qty"
            name="qty"
            value={medicalSupplyData.qty}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="ref" className="form-label">Reference</label>
          <input
            type="text"
            className="form-control"
            id="ref"
            name="ref"
            value={medicalSupplyData.ref}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="reo" className="form-label">Reordering</label>
          <input
            type="text"
            className="form-control"
            id="reo"
            name="reo"
            value={medicalSupplyData.reo}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="val" className="form-label">Value</label>
          <input
            type="number"
            className="form-control"
            id="val"
            name="val"
            value={medicalSupplyData.val}
            onChange={handleInputChange}
          />
        </div>

        {/* Existing fields */}
        {/* ... */}

        <button type="submit" className="btn btn-primary">Add Medical Supply</button>
      </form>
    </div>
  );
};

export default AddMedicalSupply;
