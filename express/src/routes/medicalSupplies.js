const express = require("express");
const router = express.Router();

// Assuming you pass the MongoDB client to this router as middleware
router.post("/add", async (req, res) => {
  const db = req.db; // Access the db instance passed from server.js
  const { genericId, itemName, itemDescription } = req.body;

  if (!genericId || !itemName || !itemDescription) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const result = await db.collection("items").insertOne({
      // Ensure correct collection name
      genericId,
      itemName,
      itemDescription,
      // Include any other fields as necessary
    });

    // Check if the insert operation was acknowledged and an ID was assigned
    if (result.acknowledged && result.insertedId) {
      res.status(201).json({
        message: "Medical supply added successfully",
        supplyId: result.insertedId, // Use insertedId to confirm successful insertion
      });
    } else {
      throw new Error("Failed to insert medical supply");
    }
  } catch (error) {
    console.error("Error adding medical supply:", error);

    if (error.code === 11000) {
      res.status(400).json({ message: "Duplicate key error" });
    } else {
      // Provide a more informative error message while ensuring it's safe to expose
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
});

module.exports = router;
