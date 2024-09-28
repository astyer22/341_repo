// routes/index.js

const express = require('express');
const router = express.Router(); // Corrected the variable name from ':' to 'router'

// Use the contacts route
router.use('/contacts', require('./contacts'));

module.exports = router;
