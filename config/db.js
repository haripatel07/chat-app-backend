// config/db.js - Database connection configuration
const mongoose = require('mongoose');
const redis = require('redis');

let redisClient;

// Function to establish connections to MongoDB and Redis
const connectDB = async () => {
  // Connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit process on connection failure
  }

  // Connect to Redis
  redisClient = redis.createClient({ url: process.env.REDIS_URL });
  redisClient.on('error', (err) => console.log('Redis Client Error', err));

  try {
    await redisClient.connect();
    console.log('Redis Connected...');
  } catch (err) {
    console.error('Redis connection error:', err.message);
    process.exit(1); // Exit process on connection failure
  }
};

module.exports = { connectDB, redisClient };