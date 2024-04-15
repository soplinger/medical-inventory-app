/*****************************************************************
 * Author: Sean Oplinger
 * Date: 4/10/2024
 * inventory.js
 * Description: Inventory routes for the Express server.
 *****************************************************************/

const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');
const authenticateToken = require('./authMiddleware');

router.get("/inventory", authenticateToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to first page
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
    const offset = (page - 1) * limit;
    const search = req.query.search ? req.query.search.trim() : '';
    const sort = req.query.sort || 'name';

    let query = 'SELECT * FROM items WHERE archived=0';
    let queryParams = [];

    if (search) {
      // Search both 'name' and 'code' fields
      query += ` AND (name LIKE ? OR code LIKE ?)`;
      queryParams.push(`%${search}%`, `%${search}%`); // add the search term for both fields
    }

    // Sorting logic
    let orderBy = 'name ASC'; // Default sort
    if (sort === 'name>') orderBy = 'name DESC';
    query += ` ORDER BY ${orderBy}`;

    // Adding LIMIT and OFFSET for pagination
    query += ' LIMIT ? OFFSET ?';
    queryParams.push(limit, offset);

    const itemsQuery = pool.query(query, queryParams);
    const totalQuery = pool.query('SELECT COUNT(*) AS total FROM items WHERE archived=0 AND (name LIKE ? OR code LIKE ?)', [`%${search}%`, `%${search}%`]);

    // Use Promise.all to run both queries in parallel
    const [[items], [[total]]] = await Promise.all([itemsQuery, totalQuery]);

    res.json({
      items,
      total: total.total,
      totalPages: Math.ceil(total.total / limit),
      currentPage: page
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
  
      const parentFolder = await pool.query('SELECT id FROM folders WHERE id = ?', [parent]);
      if (parentFolder[0].length === 0) {
        return res.status(404).send("Parent folder not found.");
      }
  
      await pool.query('INSERT INTO folders (name, parent) VALUES (?, ?)', [name, parent]);
      res.send("Folder added successfully.");
    } catch (error) {
      console.error("Error adding folder:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  router.post("/inventory/addItem", authenticateToken, async (req, res) => {
    let { id, name, parent, archived, code, img, notes, qty, ref, reo, val } = req.body;

    let alerts = req.body.alerts;

    console.log("Received data for item:", req.body); // Log the entire body to see what is received

    try {
      alerts = JSON.parse(alerts); // Attempt to parse alerts if it's a JSON string
  } catch (error) {
      alerts = { message: "N/A" }; // Default to an object directly
  }

    if (id) {
        // Update existing item
        try {
            const query = `
                UPDATE items 
                SET name = ?, parent = ?, alerts = ?, archived = ?, code = ?, img = ?, notes = ?, qty = ?, ref = ?, reo = ?, val = ?
                WHERE id = ?
            `;
            const values = [name, parent, alerts, archived, code, img, notes, qty, ref, reo, val, id];

            console.log("Executing update with values:", values); // Log the values array to be updated

            const result = await pool.query(query, values);
            console.log("Update result:", result); // Log the result of the update query

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
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const values = [name, parent, alerts, archived, code, img, notes, qty, ref, reo, val];

            console.log("Executing insert with values:", values); // Log the values array to be inserted

            const result = await pool.query(query, values);
            console.log("Insert result:", result); // Log the result of the insert query

            res.send({ message: "Item added successfully.", added: true });
        } catch (error) {
            console.error("Error adding item:", error);
            res.status(500).send("Internal Server Error");
        }
    }
});

  
// GET /items route to fetch all items
router.get('/items', authenticateToken, async (req, res) => {
    try {
      const [items] = await pool.query('SELECT * FROM items WHERE archived = 0');
      res.json(items);
    } catch (error) {
      console.error("Failed to fetch items:", error);
      res.status(500).send("Internal Server Error");
    }
  });

module.exports = router;