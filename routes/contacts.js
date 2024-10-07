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

// POST request to create a new contact
router.post('/', async (req, res) => {
    const { firstname, lastname, email, favoriteColor, birthday } = req.body;

    if (!firstname || !lastname || !email || !favoriteColor || !birthday ) return res.status(400).json({ message: 'All fields are required.' });

    try {
        const result = await mongodb.getDatabase().collection('contacts').insertOne({ firstname, lastname, email, favoriteColor, birthday, createdAt: new Date() });
        res.status(201).json({ id: result.insertedId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT request to update a contact by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, email, favoriteColor, birthday } = req.body;

    if (!firstname || !lastname || !email || !favoriteColor || !birthday) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const result = await mongodb.getDatabase().collection('contacts').updateOne(
            { _id: new mongodb.ObjectId(id) },
            { $set: { firstname, lastname, email, favoriteColor, birthday, updatedAt: new Date() } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: 'Contact not found or no changes made.' });
        }

        res.status(200).json({ message: 'Contact updated successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE a contact by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params; // Get the contact ID from the URL

    try {
        const result = await mongodb.getDatabase().collection('contacts').deleteOne({ _id: new mongodb.ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Contact not found.' }); // No contact was deleted
        }

        // Return a success message upon successful deletion
        res.status(200).json({ message: 'Contact successfully deleted.' });
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
});



module.exports = router;
