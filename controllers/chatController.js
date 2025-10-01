// controllers/chatController.js - Chat history controller
const Message = require('../models/Message');
const { redisClient } = require('../config/db');

// @desc    Get chat history for a room
// @route   GET /api/chat/:roomId
// @access  Private
exports.getChatHistory = async (req, res) => {
  const { roomId } = req.params;

  try {
    // First, try to fetch messages from Redis cache for faster access
    const cachedMessages = await redisClient.lRange(`chat:${roomId}`, 0, -1);

    if (cachedMessages && cachedMessages.length > 0) {
      // Parse cached messages and return them (reverse to get chronological order)
      const messages = cachedMessages.map(msg => JSON.parse(msg)).reverse();
      return res.status(200).json(messages);
    }

    // If cache is empty, fetch from MongoDB database
    const messages = await Message.find({ room: roomId })
      .sort({ createdAt: 1 }) // Sort by creation time ascending
      .populate('sender', 'username'); // Include sender's username

    // Populate Redis cache for future requests
    if (messages.length > 0) {
      const messageStrings = messages.map(msg => JSON.stringify(msg));
      await redisClient.lPush(`chat:${roomId}`, ...messageStrings);
    }

    res.status(200).json(messages);

  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({ message: 'Server error fetching chat history' });
  }
};