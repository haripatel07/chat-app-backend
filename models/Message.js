// models/Message.js - Message schema for chat messages
const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000 // Limit message length
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  room: {
    type: String,
    required: true,
    index: true // Index for faster queries by room
  },
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Add index for efficient querying by room and timestamp
MessageSchema.index({ room: 1, createdAt: 1 });

module.exports = mongoose.model('Message', MessageSchema);