/*****************************************************************
 * Author: Sean Oplinger
 * Date: 4/10/2024
 * inventory.js
 * Description: Inventory routes for the Express server.
 *****************************************************************/

const express = require("express");
const router = express.Router();
const { pool } = require("../config/db");
const authenticateToken = require("./authMiddleware");

const addHistoryLog = async (item, user, data) => {
  try {
    const query = `
      INSERT INTO history (item, user, data, time)
      VALUES (?, ?, ?, NOW());
    `;
    const values = [item, user, JSON.stringify(data)];
    await pool.query(query, values);
  } catch (error) {
    console.error("Error adding history log:", error);
  }
};

router.get("/inventory", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const search = req.query.search ? req.query.search.trim() : "";
    const id = req.query.id ? parseInt(req.query.id) : null; // Parse id if provided
    const sortQuery = req.query.sort || "name_asc";

    const validSortFields = ["name", "qty", "val", "id"]; // Extend this list based on your needs
    const sortOrder = ["asc", "desc"];
    const [sortField, sortDirection] = sortQuery.split("_");

    let query = "SELECT * FROM items WHERE archived=0";
    let queryParams = [];

    if (search) {
      query += ` AND name LIKE ?`;
      queryParams.push(`%${search}%`);
    }

    if (id) {
      query += ` AND id = ?`; // Add condition to search by ID
      queryParams.push(id);
    }

    // Sorting logic with validation
    let orderBy = "name ASC"; // Default sort
    if (
      validSortFields.includes(sortField) &&
      sortOrder.includes(sortDirection)
    ) {
      orderBy = `${sortField} ${sortDirection.toUpperCase()}`;
    }
    query += ` ORDER BY ${orderBy}`;

    // Adding LIMIT and OFFSET for pagination
    query += " LIMIT ? OFFSET ?";
    queryParams.push(limit, offset);

    const itemsQuery = pool.query(query, queryParams);
    const totalQuery = pool.query(
      "SELECT COUNT(*) AS total FROM items WHERE archived=0"
    );

    // Use Promise.all to run both queries in parallel
    const [[items], [[total]]] = await Promise.all([itemsQuery, totalQuery]);

    res.json({
      items,
      total: total.total,
      totalPages: Math.ceil(total.total / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching inventory items:", error);
    res.status(500).send("Internal Server Error");
  }
});

// POST /inventory/addFolder route to add a new folder
router.post("/inventory/addFolder", authenticateToken, async (req, res) => {
  try {
    const { name, parent } = req.body;
    if (!name || /[\"/>\\]/.test(name)) {
      return res.status(400).send("Invalid folder name.");
    }

    const parentFolder = await pool.query(
      "SELECT id FROM folders WHERE id = ?",
      [parent]
    );
    if (parentFolder[0].length === 0) {
      return res.status(404).send("Parent folder not found.");
    }

    await pool.query("INSERT INTO folders (name, parent) VALUES (?, ?)", [
      name,
      parent,
    ]);
    res.send("Folder added successfully.");
  } catch (error) {
    console.error("Error adding folder:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/inventory/addItem", authenticateToken, async (req, res) => {
  let {
    id,
    name,
    parent,
    alerts,
    archived,
    code,
    img,
    notes,
    qty,
    ref,
    reo,
    val,
  } = req.body;

  if (id) {
    // Update existing item
    try {
      const query = `
        UPDATE items
        SET name = ?, parent = ?, alerts = ?, archived = ?, code = ?, img = ?, notes = ?, qty = ?, ref = ?, reo = ?, val = ?
        WHERE id = ?;
      `;
      const values = [
        name,
        parent,
        alerts,
        archived,
        code,
        img,
        notes,
        qty,
        ref,
        reo,
        val,
        id,
      ];
      const result = await pool.query(query, values);

      // Log the update to history
      const userData = req.user; // Assuming you have user info in req.user
      addHistoryLog(id, 1, req.body);

      res.send({ message: "Item updated successfully.", updated: true });
    } catch (error) {
      console.error("Error updating item:", error);
      res.status(500).send("Internal Server Error");
    }
  } else {
    // Add new item
    try {
      const query = `
        INSERT INTO items (name, parent, alerts, archived, code, img, notes, qty, ref, reo, val)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      `;
      const values = [
        name,
        parent,
        alerts,
        archived,
        code,
        img,
        notes,
        qty,
        ref,
        reo,
        val,
      ];
      const result = await pool.query(query, values);

      // Log the addition to history
      const userData = req.user; // Assuming you have user info in req.user
      addHistoryLog(result.insertId, 1, req.body);

      res.send({ message: "Item added successfully.", added: true });
    } catch (error) {
      console.error("Error adding item:", error);
      res.status(500).send("Internal Server Error");
    }
  }
});

// GET /items route to fetch all items
router.get("/items", authenticateToken, async (req, res) => {
  try {
    const [items] = await pool.query("SELECT * FROM items WHERE archived = 0");
    res.json(items);
  } catch (error) {
    console.error("Failed to fetch items:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/inventory/metrics", authenticateToken, async (req, res) => {
  try {
    const query = `
            SELECT 
                COUNT(DISTINCT id) AS uniqueItems,
                COUNT(id) AS totalItems,
                SUM(val) AS totalValue,
                SUM(CASE WHEN qty = 0 THEN 1 ELSE 0 END) AS outOfStock
            FROM items
            WHERE archived = 0;
        `;
    const [results] = await pool.query(query);
    res.json({
      uniqueItems: results[0].uniqueItems,
      totalItems: results[0].totalItems,
      totalValue: results[0].totalValue.toFixed(2),
      outOfStock: results[0].outOfStock,
    });
  } catch (error) {
    console.error("Error fetching inventory metrics:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
