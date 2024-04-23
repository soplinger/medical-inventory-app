const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/db"); // Ensure jwtSecret is properly imported

const authenticateToken = (req, res, next) => {
  // Extract the token from either the cookie or the Authorization header
  let token = req.cookies.token; // Assuming you're storing your token in cookies

  // If the token is not in cookies, try to get it from the Authorization header
  if (!token && req.headers.authorization) {
    const authHeader = req.headers.authorization;
    const tokenParts = authHeader.split(" "); // Split on space to get ["Bearer", "<token>"]

    if (tokenParts.length === 2 && tokenParts[0] === "Bearer") {
      // Ensure that Authorization header is formatted correctly
      token = tokenParts[1];
    } else {
      return res
        .status(401)
        .json({ message: "Authorization format should be 'Bearer [token]'" });
    }
  }

  if (!token) {
    return res
      .status(403)
      .json({ message: "No token provided, authorization denied" });
  }

  try {
    // Verify the token with your secret key
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded; // Add the decoded user data to the request object
    next(); // Proceed to next middleware or the route handler
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).send("Invalid or expired token");
  }
};

module.exports = authenticateToken;
