// index.js - Main entry point for the chat application backend
require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const initializeSocket = require('./services/socket');

// Initialize Express application
const app = express();
const server = http.createServer(app);

// Establish database connections (MongoDB and Redis)
connectDB();

// Middleware setup
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse JSON request bodies

// API route handlers
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));

// Initialize Socket.IO for real-time communication
const io = new Server(server, {
  cors: {
    origin: "*", // Allow connections from any origin (configure for production)
    methods: ["GET", "POST"]
  }
});
initializeSocket(io);

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));