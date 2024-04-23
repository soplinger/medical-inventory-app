/*****************************************************************
 * Author: Your Name
 * Date: 4/10/2024
 * history.js
 * Description: History routes for the Express server, including pagination.
 *****************************************************************/

const express = require("express");
const router = express.Router();
const { pool } = require("../config/db");
const authenticateToken = require("./authMiddleware");

/**
 * POST /history/add - Adds a new entry to the history
 */
router.post("/history/add", authenticateToken, async (req, res) => {
  const { data, item, time, user } = req.body;

  if (!data || !item || !time || !user) {
    return res.status(400).send("Missing required fields.");
  }

  try {
    const query = `
            INSERT INTO history (data, item, time, user) 
            VALUES (?, ?, ?, ?);
        `;
    const values = [data, item, time, user];

    await pool.query(query, values);
    res.send({ message: "History record added successfully." });
  } catch (error) {
    console.error("Error adding history record:", error);
    res.status(500).send("Internal Server Error");
  }
});

/**
 * GET /history/logs - Retrieves history logs with pagination, sorting, and item names.
 */
router.get("/history/logs", authenticateToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Updated query to sort by time in descending order by default
    let query = `SELECT h.id, h.time, h.user, h.item, i.name as itemName
                 FROM history h
                 LEFT JOIN items i ON h.item = i.id
                 ORDER BY h.time DESC LIMIT ? OFFSET ?`; // Ensure sorting is done here

    const itemsQuery = pool.query(query, [limit, offset]);
    const totalQuery = pool.query("SELECT COUNT(*) AS total FROM history");

    // Execute both queries in parallel using Promise.all
    const [[items], [[total]]] = await Promise.all([itemsQuery, totalQuery]);

    res.json({
      items,
      total: total.total,
      totalPages: Math.ceil(total.total / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching history logs:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
