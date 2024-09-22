// Importin express
const express = require('express');

// Create an Instance of express
const app = express();

// Define a port
const port = 3000;

// Define a route
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/name', (req, res) => {
    res.send('Austin Styer')
})

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})