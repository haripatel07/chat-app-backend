// services/socket.js - Handles real-time socket communication
const Message = require('../models/Message');
const { redisClient } = require('../config/db');

function initializeSocket(io) {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Handle user joining a chat room
    socket.on('joinRoom', ({ roomId }) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);
    });

    // Handle sending new messages
    socket.on('sendMessage', async ({ roomId, content, senderId }) => {
      try {
        const messageData = { content, sender: senderId, room: roomId };

        // Save message to MongoDB for persistence
        const message = new Message(messageData);
        await message.save();

        // Cache message in Redis for quick access
        const messageString = JSON.stringify(await message.populate('sender', 'username'));
        await redisClient.lPush(`chat:${roomId}`, messageString);
        await redisClient.lTrim(`chat:${roomId}`, 0, 99); // Keep only last 100 messages in cache

        // Broadcast the message to all users in the room
        io.to(roomId).emit('newMessage', JSON.parse(messageString));
      } catch (error) {
        console.error('Error sending message:', error);
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    // Handle typing indicators
    socket.on('typing', ({ roomId, username }) => {
      socket.to(roomId).emit('userTyping', { username });
    });

    socket.on('stopTyping', ({ roomId }) => {
      socket.to(roomId).emit('userStoppedTyping');
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
}

module.exports = initializeSocket;