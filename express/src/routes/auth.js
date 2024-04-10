const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const { pool, jwtSecret } = require('../config/db');

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Fetch the user's details, including the salt and password hash
      const [[user]] = await pool.query('SELECT id, email, password, salt, perms FROM users WHERE email = ?', [email]);
      if (!user) {
        return res.status(401).send("Invalid credentials");
      }
  
      // Use Argon2 to verify the password with the stored hash
      // Note: In this scenario, it's assumed that the password stored in the database
      // is already hashed using Argon2 with the salt being part of the hash.
      const validPassword = await argon2.verify(user.password, password + user.salt);
  
      if (validPassword) {
        // Password is correct; proceed with generating a JWT token
        const token = jwt.sign({ userId: user.id, perms: user.perms }, jwtSecret, { expiresIn: "1h" });
  
        // Send the token as a cookie
        res.cookie("token", token, { httpOnly: true, sameSite: 'strict', maxAge: 3600000 }); // Adjust cookie settings as needed
        res.json({ message: "Logged in successfully", user: { email: user.email, perms: user.perms } });
      } else {
        res.status(401).send("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).send("Internal Server Error");
    }
  });

module.exports = router;