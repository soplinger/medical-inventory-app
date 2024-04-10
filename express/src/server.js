const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const inventoryRoutes = require('./routes/inventory');

const app = express();
const port = 4000;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use(authRoutes);
app.use(inventoryRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
