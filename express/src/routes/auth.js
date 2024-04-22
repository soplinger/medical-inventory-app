/*****************************************************************
 * Author: Sean Oplinger
 * Date: 4/10/2024
 * auth.js
 * Description: Authentication routes for the Express server.
 *****************************************************************/

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { pool, jwtSecret } = require("../config/db");
const ip = require("ip");
const authenticateToken = require("./authMiddleware");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Fetch the user's details, including the salt and password hash
    const [[user]] = await pool.query(
      "SELECT id, email, password, salt, perms FROM users WHERE email = ?",
      [email]
    );

    if (!user) {
      return res.status(401).send("Invalid credentials NO USER FOUND");
    }

    // Use bcrypt to verify the password with the stored hash
    const validPassword = await bcrypt.compare(password, user.password);

    if (validPassword) {
      // Password is correct; proceed with generating a JWT token
      const token = jwt.sign(
        { userId: user.id, perms: user.perms },
        jwtSecret,
        { expiresIn: "1h" }
      );

      // Send the token as a cookie
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 3600000,
      }); // Adjust cookie settings as needed
      res.json({
        message: "Logged in successfully",
        user: { email: user.email, perms: user.perms },
      });
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/register", authenticateToken, async (req, res) => {
  const { email, password, first, last, role } = req.body;
  const userIp = req.ip; // Extract user's IP address from the request

  try {
    // Check if the user already exists
    const [existingUser] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Construct the logins object with the user's IP address and current timestamp
    const logins = JSON.stringify({
      ip: userIp,
      timestamp: new Date().toISOString(),
    });

    const perms = "login";

    // Insert the new user into the database
    await pool.query(
      "INSERT INTO users (email, first, last, logins, password, perms, role, salt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [email, first, last, logins, hashedPassword, perms, role, salt]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
