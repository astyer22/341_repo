const express = require('express');
const router = express.Router();
const mongodb = require('../database/connection');

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: API for managing contacts
 */

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Retrieve all contacts
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: A list of contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   firstname:
 *                     type: string
 *                   lastname:
 *                     type: string
 *                   email:
 *                     type: string
 *                   favoriteColor:
 *                     type: string
 *                   birthday:
 *                     type: string
 *                     format: date
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 */
router.get('/', async (req, res) => {
    try {
        const result = await mongodb.getDatabase().collection('contacts').find().toArray();
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Retrieve a single contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the contact
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single contact object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 firstname:
 *                   type: string
 *                 lastname:
 *                   type: string
 *                 email:
 *                   type: string
 *                 favoriteColor:
 *                   type: string
 *                 birthday:
 *                   type: string
 *                   format: date
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               favoriteColor:
 *                 type: string
 *               birthday:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Contact created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/', async (req, res) => {
    const { firstname, lastname, email, favoriteColor, birthday } = req.body;

    if (!firstname || !lastname || !email || !favoriteColor || !birthday) return res.status(400).json({ message: 'All fields are required.' });

    try {
        const result = await mongodb.getDatabase().collection('contacts').insertOne({ firstname, lastname, email, favoriteColor, birthday, createdAt: new Date() });
        res.status(201).json({ id: result.insertedId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update a contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the contact
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               favoriteColor:
 *                 type: string
 *               birthday:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Contact updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the contact
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact successfully deleted
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await mongodb.getDatabase().collection('contacts').deleteOne({ _id: new mongodb.ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Contact not found.' });
        }

        res.status(200).json({ message: 'Contact successfully deleted.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
