const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI; // Your MongoDB URI
let database;

const connect = async () => {
    const client = new MongoClient(uri);
    await client.connect();
    database = client.db('ces341'); // Your database name
    console.log("MongoDB connected successfully");
};

const getDatabase = () => {
    if (!database) {
        throw new Error("Database not initialized. Call connect() first.");
    }
    return database;
};

module.exports = {
    connect,
    getDatabase,
    ObjectId  // Export ObjectId for use in routes
};
