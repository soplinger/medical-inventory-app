/*****************************************************************
 * Author: Sean Oplinger
 * Date: 4/10/2024
 * db.js
 * Description: Database connection configuration
 *****************************************************************/

// Import the dotenv module
require('dotenv').config();

// Import the mysql2 module
const mysql = require('mysql2/promise');

// Define the jwtSecret key
const jwtSecret = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxMjc5MzM4MiwiaWF0IjoxNzEyNzkzMzgyfQ.MAApaET_TzA88Xh2z8dVondrHczlgkztlFCcQBpzuEI";

// Create a connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

module.exports = {
    pool,
    jwtSecret
  };