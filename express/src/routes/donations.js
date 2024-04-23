/*****************************************************************
 * Author: Sean Oplinger
 * Date: 4/10/2024
 * donations.js
 * Description: Donation routes for the Express server.
 *****************************************************************/

const express = require("express");
const router = express.Router();
const { pool } = require("../config/db");
const authenticateToken = require("./authMiddleware");

router.get("/donations/available", authenticateToken, async (req, res) => {
  try {
    const search = req.query.search || ""; // Get search query from URL parameters
    const [items] = await pool.query(
      "SELECT id, name, qty, val FROM items WHERE archived = 0 AND qty > 0 AND name LIKE ?",
      [`%${search}%`] // Use the LIKE operator for partial matching
    );
    res.json(items);
  } catch (error) {
    console.error("Failed to fetch available items:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/donations/donate", authenticateToken, async (req, res) => {
  const { userId, donations } = req.body; // donations should be an array of { itemId, qty, sent }

  if (!donations || !donations.length) {
    return res.status(400).send("No donations provided.");
  }

  const validSents = [
    "Network",
    "Ukraine",
    "School of Medicine",
    "School of Nursing",
    "External",
  ];
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    for (const donation of donations) {
      const { itemId, qty, sent = "Network" } = donation; // Defaulting `sent` to 'Network'

      // Validate `sent` value
      if (!validSents.includes(sent)) {
        throw new Error("Invalid 'sent' value.");
      }

      // Check if sufficient quantity exists
      const [item] = await connection.query(
        "SELECT qty FROM items WHERE id = ?",
        [itemId]
      );
      if (item.length === 0 || item[0].qty < qty) {
        throw new Error("Not enough stock or item does not exist");
      }

      // Insert into donations table
      await connection.query(
        "INSERT INTO donations (item, user, qty, val, time, sent, notes) VALUES (?, ?, ?, (SELECT val FROM items WHERE id = ?), NOW(), ?, '')",
        [itemId, userId, qty, itemId, sent]
      );

      // Update items table
      await connection.query("UPDATE items SET qty = qty - ? WHERE id = ?", [
        qty,
        itemId,
      ]);
    }

    await connection.commit();
    res.send("Donation recorded successfully.");
  } catch (error) {
    await connection.rollback();
    console.error("Error processing donation:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    connection.release();
  }
});

router.get("/donations/search", authenticateToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const search = req.query.search ? req.query.search.trim() : "";
    const sort = req.query.sort || "time_asc"; // Default sort by time

    const validSortFields = ["time", "qty", "val", "sent"];
    const [sortField, sortDirection] = sort.split("_");

    let query =
      "SELECT id, item, qty, val, time, sent, notes, user FROM donations WHERE 1=1";
    let queryParams = [];

    if (search) {
      query += " AND item LIKE ?";
      queryParams.push(`%${search}%`);
    }

    // Sorting logic with validation
    let orderBy = "time ASC"; // Default sort by time
    if (
      validSortFields.includes(sortField) &&
      (sortDirection === "asc" || sortDirection === "desc")
    ) {
      orderBy = `${sortField} ${sortDirection.toUpperCase()}`;
    }
    query += ` ORDER BY ${orderBy}`;

    // Adding LIMIT and OFFSET for pagination
    query += " LIMIT ? OFFSET ?";
    queryParams.push(limit, offset);

    // Execute queries
    const itemsQuery = pool.query(query, queryParams);
    const totalQuery = pool.query("SELECT COUNT(*) AS total FROM donations");

    // Use Promise.all to run both queries in parallel
    const [[donations], [[total]]] = await Promise.all([
      itemsQuery,
      totalQuery,
    ]);

    res.json({
      donations,
      total: total.total,
      totalPages: Math.ceil(total.total / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching donations:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
