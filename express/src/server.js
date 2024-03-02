// server.js

const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwtSecret = "yourSecretKey";

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

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
// Middleware to add db to the request
app.use((req, res, next) => {
  req.db = client.db("inventoryDB"); // Access the database from the client instance
  next();
});

// Example GET route to fetch items - demonstrating MongoDB usage
app.get("/items", async (req, res) => {
  try {
    const itemsCollection = req.db.collection("items");
    const items = await itemsCollection.find({}).toArray();
    res.json(items);
  } catch (e) {
    console.error("Error fetching items:", e);
    res.status(500).send("Internal Server Error");
  }
});

// Import the refactored medicalSupplies route
const medicalSuppliesRoute = require("./routes/medicalSupplies"); // Adjust the path as necessary
app.use("/api/medical-supplies", medicalSuppliesRoute);

app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const usersCollection = req.db.collection("users");
    const existingUser = await usersCollection.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    await usersCollection.insertOne({
      username,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created" });
  } catch (e) {
    console.error("Signup error:", e);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const usersCollection = req.db.collection("users");
    const user = await usersCollection.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Generate JWT
      const token = jwt.sign({ userId: user._id }, jwtSecret, {
        expiresIn: "1h",
      });
      res.json({ token });
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (e) {
    console.error("Login error:", e);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
