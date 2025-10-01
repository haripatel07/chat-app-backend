// routes/chatRoutes.js - Chat-related routes
const express = require('express');
const router = express.Router();
const { getChatHistory } = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/chat/:roomId
// @desc    Get chat history for a specific room
// @access  Private (requires authentication)
router.get('/:roomId', protect, getChatHistory);

module.exports = router;