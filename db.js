const mongoose = require('mongoose');

// Define the MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hotels';

// set up mongodb connection
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('connected',()=>{
    console.log('Connected to MongoDB server');
})

db.on('error',()=>{
    console.log('MongoDB connection error');
})

db.on('disconnected',()=>{
    console.log('MongoDB disconnected');
})

// Export the database connection
module.exports = db;