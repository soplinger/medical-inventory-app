const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');

router.get('/ping', (req, res) => {
    res.status(200).send('pong');
}
);

module.exports = router;