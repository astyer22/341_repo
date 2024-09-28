// root > database > connection.js
const mongoose = require('mongoose');

const URI = "mongodb+srv://341user:341user@cluster0.imgys.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectDB = async() => {
   await mongoose.connect(URI);
   console.log('db connected...!');
}

module.exports = connectDB;