const express = require('express');
const router = express.Router();
const contactsRoute = require('./contacts');

router.use('/contacts', contactsRoute);  // This includes the contacts routes

module.exports = router;
