const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./database/connection');
const routes = require('./routes/index');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(routes);  // This includes the contacts routes

app.listen(PORT, async () => {
    try {
        await mongodb.connect();
        console.log(`Server is running on http://localhost:${PORT}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
});
