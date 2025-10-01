// middleware/authMiddleware.js - JWT authentication middleware
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes that require authentication
exports.protect = async (req, res, next) => {
  let token;

  // Check if authorization header exists and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token and extract user ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user from database (excluding password) and attach to request
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Proceed to next middleware/route handler
    } catch (error) {
      console.error('Token verification failed:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};