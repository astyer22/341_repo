// server.js

const express = require('express'); // Import express
const connectDB = require('./database/connection'); // Import your MongoDB connection
const routes = require('./routes/index'); // Import routes from index.js

const app = express(); // Create an Express application
const PORT = process.env.PORT || 3000; // Set the port, defaulting to 3000

// Connect to the database
connectDB();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use('/api', routes); // Mount the routes at the /api endpoint

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
