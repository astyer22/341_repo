// server.js

const express = require('express');
const mongodb = require('./database/connection');
const routes = require('./routes/index');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const cors = require('cors'); // Require CORS middleware

const app = express();
const PORT = process.env.PORT || 3000;

// CORS options
const corsOptions = {
    origin: 'http://localhost:3000', 
    optionsSuccessStatus: 200 
};

app.use(cors(corsOptions)); 
app.use(express.json()); 
app.use(routes); 

// Setup Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, async () => {
    try {
        await mongodb.connect(); // Ensure the connect function works properly
        console.log(`Server is running on http://localhost:${PORT}`);
        console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
});
