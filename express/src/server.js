const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
const port = 4000;

app.use(cors());

// MongoDB connection setup (replace with your connection details)
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Connect to MongoDB
async function connect() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (e) {
    console.error(e);
  }
}

connect();

// Your route for getting items
app.get("/items", async (req, res) => {
  try {
    const database = client.db("test"); // Replace with your DB name
    const items = database.collection("items");
    const query = {}; // Modify as needed for filtering
    const itemList = await items.find(query).toArray();
    res.json(itemList);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
