const mongodb = require('../database/connection');
const { ObjectId } = require('mongodb');

// Get all contacts
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('contacts').find().toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts', error });
  }
};

// Get a single contact by ID
const getSingle = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('contacts').findOne({ _id: userId });
    result
      ? res.status(200).json(result)
      : res.status(404).json({ message: 'Contact not found' });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact', error });
  }
};

// Create a new contact
const createContact = async (req, res) => {
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;
  const newContact = { firstName, lastName, email, favoriteColor, birthday };

  try {
    const response = await mongodb.getDb().db().collection('contacts').insertOne(newContact);
    response.acknowledged
      ? res.status(201).json(response)
      : res.status(500).json({ message: 'Error creating contact' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating contact', error });
  }
};

// Update a contact by ID
const updateContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;
  const updatedContact = { firstName, lastName, email, favoriteColor, birthday };

  try {
    const response = await mongodb.getDb().db().collection('contacts').replaceOne({ _id: userId }, updatedContact);
    response.modifiedCount > 0
      ? res.status(204).send()
      : res.status(404).json({ message: 'Contact not found or not updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating contact', error });
  }
};

// Delete a contact by ID
const deleteContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);

  try {
    const response = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: userId });
    response.deletedCount > 0
      ? res.status(204).send()
      : res.status(404).json({ message: 'Contact not found' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact', error });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};
