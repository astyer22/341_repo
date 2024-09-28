// routes/contacts.js

const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const db = require('../database/connection');

// Route to get all contacts
router.get('/', async (req, res) => {
    try {
        console.log('Fetching all contacts...'); // Log request
        const contacts = await db.collection('contacts').find().toArray(); // Fetch all contacts
        console.log(`Contacts fetched: ${contacts.length}`); // Log number of contacts
        res.status(200).json(contacts); // Respond with contacts
    } catch (error) {
        console.error('Error fetching contacts:', error.stack); // Log error
        res.status(500).json({ message: 'Error fetching contacts', error: error.message }); // Respond with error
    }
});

// Route to get a single contact by ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id; // Extract the ID from request parameters
        console.log(`Fetching contact with ID: ${id}`); // Log the ID being fetched

        // Check if the ID format is valid
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        // Fetch the contact by ID
        const contact = await db.collection('contacts').findOne({ _id: new ObjectId(id) });
        
        // Check if the contact was found
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(200).json(contact); // Respond with the contact details
    } catch (error) {
        console.error('Error fetching contact by ID:', error.stack); // Log error
        res.status(500).json({ message: 'Error fetching contact by id', error: error.message }); // Respond with error
    }
});

module.exports = router;
