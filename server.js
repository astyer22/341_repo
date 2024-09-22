// index.js (root)

// Import express
const express = require('express');

// Import the controller
const nameController = require('./controllers'); 

// Create an instance of express
const app = express();

// Define a port
const port = 3000;

// Define a route for the homepage
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Define the '/name' route using the controller
app.get('/name', nameController.getName);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
