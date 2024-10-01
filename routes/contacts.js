const express = require('express');
const router = express.Router();
const mongodb = require('../database/connection');

// GET all contacts
router.get('/', async (req, res) => {
    try {
        const result = await mongodb.getDatabase().collection('contacts').find().toArray();
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// GET a single contact by ID
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await mongodb.getDatabase().collection('contacts').findOne({ _id: new mongodb.ObjectId(id) });
        if (!result) {
            return res.status(404).send('Contact not found');
        }
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
