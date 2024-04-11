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
const path = require('path');

const app = express();
const port = 80;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api', authRoutes);
app.use('/api', inventoryRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../../build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../build/index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
