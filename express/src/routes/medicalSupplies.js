const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Define the medical supply schema with additional fields
const medicalSupplySchema = new mongoose.Schema({
  genericId: { type: String, required: true },
  itemName: { type: String, required: true },
  itemDescription: { type: String, required: true },
  itemCheckedIn: { type: Date, required: true },
  itemExpiry: { type: Date, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  batchNumber: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, required: true },
  additionalInfo: {
    createdBy: String,
    createdAt: Date,
    modifiedBy: String,
    modifiedAt: Date,
  },
});

// Create a model from the schema
const MedicalSupply = mongoose.model("MedicalSupply", medicalSupplySchema);

// Define a route for adding a new medical supply
router.post("/add", async (req, res) => {
  try {
    // Deconstruct fields from req.body, assuming all fields are provided
    const {
      genericId,
      itemName,
      itemDescription,
      itemCheckedIn,
      itemExpiry,
      quantity,
      unit,
      batchNumber,
      location,
      status,
    } = req.body;

    // Validate the input as needed (simple example shown, customize as needed)
    if (!itemName || !itemDescription) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Construct additionalInfo with server-controlled fields like createdAt
    const enhancedAdditionalInfo = {
      ...additionalInfo,
      createdAt: new Date(), // Set creation date to now
      modifiedAt: new Date(), // Set modified date to now
    };

    // Save the new medical supply to the database
    const newMedicalSupply = await MedicalSupply.create({
      genericId,
      itemName,
      itemDescription,
      itemCheckedIn,
      itemExpiry,
      quantity,
      unit,
      batchNumber,
      location,
      status,
      additionalInfo: enhancedAdditionalInfo,
    });

    // Respond with a success message and the newly created supply
    res.status(201).json({
      message: "Medical supply added successfully",
      supply: newMedicalSupply,
    });
  } catch (error) {
    console.error("Error adding medical supply:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
