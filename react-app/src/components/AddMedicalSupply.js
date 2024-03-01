import React, { useState } from "react";
import { addMedicalSupply } from "../api/api"; // Ensure this is implemented to call your backend

const AddMedicalSupply = () => {
  // State for all fields based on the MongoDB structure
  const [genericId, setGenericId] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemCheckedIn, setItemCheckedIn] = useState("");
  const [itemExpiry, setItemExpiry] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  // Assuming createdBy and modifiedBy are handled server-side for simplicity

  const handleItemSubmit = async (e) => {
    e.preventDefault();

    const medicalSupplyData = {
      genericId,
      itemName,
      itemDescription,
      itemCheckedIn,
      itemExpiry,
      quantity: Number(quantity), // Convert quantity to Number
      unit,
      batchNumber,
      location,
      status,
      // additionalInfo fields like createdBy/modifiedBy could be added here if needed
    };

    try {
      const response = await addMedicalSupply(medicalSupplyData);
      if (response) {
        console.log("Medical supply added successfully");
        // Reset form fields after successful submission
        setGenericId("");
        setItemName("");
        setItemDescription("");
        setItemCheckedIn("");
        setItemExpiry("");
        setQuantity("");
        setUnit("");
        setBatchNumber("");
        setLocation("");
        setStatus("");
      }
    } catch (error) {
      console.error("Error adding medical supply:", error);
    }
  };

  return (
    <div>
      <h2>Add New Medical Supply</h2>
      <form onSubmit={handleItemSubmit}>
        {/* Fields for each part of the medical supply data */}
        {/* Repeating the pattern below for each required input */}
        <div className="mb-3">
          <label htmlFor="genericId" className="form-label">
            Generic ID
          </label>
          <input
            type="text"
            className="form-control"
            id="genericId"
            value={genericId}
            onChange={(e) => setGenericId(e.target.value)}
          />
          <label htmlFor="itemName" className="form-label">
            Item Name
          </label>
          <input
            type="text"
            className="form-control"
            id="itemName"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <label htmlFor="itemDescription" className="form-label">
            Item Description
          </label>
          <input
            type="text"
            className="form-control"
            id="itemDescription"
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
          />
          <label htmlFor="itemCheckedIn" className="form-label">
            Item Checked In
          </label>
          <input
            type="text"
            className="form-control"
            id="itemCheckedIn"
            value={itemCheckedIn}
            onChange={(e) => setItemCheckedIn(e.target.value)}
          />
          <label htmlFor="itemExpiry" className="form-label">
            Item Expiry
          </label>
          <input
            type="text"
            className="form-control"
            id="itemExpiry"
            value={itemExpiry}
            onChange={(e) => setItemExpiry(e.target.value)}
          />
          <label htmlFor="quantity" className="form-label">
            Quantity
          </label>
          <input
            type="text"
            className="form-control"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <label htmlFor="unit" className="form-label">
            Unit
          </label>
          <input
            type="text"
            className="form-control"
            id="unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          />
          <label htmlFor="batchNumber" className="form-label">
            Batch Number
          </label>
          <input
            type="text"
            className="form-control"
            id="batchNumber"
            value={batchNumber}
            onChange={(e) => setBatchNumber(e.target.value)}
          />
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            type="text"
            className="form-control"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <input
            type="text"
            className="form-control"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>

        {/* Additional fields omitted for brevity, follow the pattern above */}
        {/* Example for itemName and itemDescription is provided above */}
        {/* Add fields for itemCheckedIn, itemExpiry, quantity, unit, batchNumber, location, status */}

        <button type="submit" className="btn btn-primary">
          Add Medical Supply
        </button>
      </form>
    </div>
  );
};

export default AddMedicalSupply;
