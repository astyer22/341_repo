// controllers/index.js

// Import all controllers here
const contactsController = require('./contactsController'); // Adjust the path as necessary

// Export an object containing the controllers
module.exports = {
    contacts: contactsController,
    // You can add more controllers as you create them
};
