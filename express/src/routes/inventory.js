const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');

// GET /inventory route to fetch inventory items
router.get("/inventory", async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; // Default to first page
      const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
      const offset = (page - 1) * limit;
      const search = req.query.search ? req.query.search.trim() : '';
      const sort = req.query.sort || 'name';
  
      let query = 'SELECT * FROM items WHERE archived=0';
      let queryParams = [];
  
      if (search) {
        query += ` AND name LIKE ?`;
        queryParams.push(`%${search}%`);
      }
  
      // Sorting logic
      let orderBy = 'name ASC'; // Default sort
      if (sort === 'name>') orderBy = 'name DESC';
      query += ` ORDER BY ${orderBy}`;
  
      // Adding LIMIT and OFFSET for pagination
      query += ' LIMIT ? OFFSET ?';
      queryParams.push(limit, offset);
  
      const itemsQuery = pool.query(query, queryParams);
      const totalQuery = pool.query('SELECT COUNT(*) AS total FROM items WHERE archived=0');
  
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
  router.post("/inventory/addFolder", async (req, res) => {
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

// POST /inventory/addItem route to add a new item
  router.post("/inventory/addItem", async (req, res) => {
    try {
      const { 
        name, parent, alerts = null, archived = 0, code = null, 
        img = 1, notes = '', qty = 0, ref = null, reo = null, val = 0 
      } = req.body;
      
      await pool.query(
        'INSERT INTO items (name, parent, alerts, archived, code, img, notes, qty, ref, reo, val) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
        [name, parent, alerts, archived, code, img, notes, qty, ref, reo, val]
      );
      
      res.send("Item added successfully.");
    } catch (error) {
      console.error("Error adding item:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  
// GET /items route to fetch all items
router.get('/items', async (req, res) => {
    try {
      const [items] = await pool.query('SELECT * FROM items WHERE archived = 0');
      res.json(items);
    } catch (error) {
      console.error("Failed to fetch items:", error);
      res.status(500).send("Internal Server Error");
    }
  });

module.exports = router;