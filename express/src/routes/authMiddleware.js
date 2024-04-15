const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/db');

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: "You are not authorized" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded; // Add the decoded user to the request object
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).send("Invalid Token");
  }
};

module.exports = authenticateToken;
