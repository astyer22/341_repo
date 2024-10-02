// root > database > connection.js
const mongoose = require('mongoose');

const URI = "mongodb+srv://341user:341user@cluster0.imgys.mongodb.net/cluster0?retryWrites=true&w=majority&appName=cse341";

const connectDB = async () => {
   await mongoose.connect(URI);
   console.log('db connected... :)');
}

module.exports = connectDB;
