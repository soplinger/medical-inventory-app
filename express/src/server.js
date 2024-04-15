/*****************************************************************
 * Author: Sean Oplinger
 * Date: 4/10/2024
 * server.js
 * Description: Express server for the Inventory application. 
 *****************************************************************/

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const inventoryRoutes = require('./routes/inventory');
const testRoutes = require('./routes/testing');
const path = require('path');

const app = express();
const port = process.env.PORT || 4000;

// Define the path to the React build directory
const buildPath = path.join('/root', 'react-app', 'build');

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api', authRoutes);
app.use('/api', inventoryRoutes);
app.use('/api', testRoutes);

// Serve static files from the React app
app.use(express.static(buildPath));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'), (err) => {
    if (err) {
      res.status(500).send("Server Error: Unable to load the index.html file.");
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
