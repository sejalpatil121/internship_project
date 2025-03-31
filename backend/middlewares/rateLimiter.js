const rateLimit = require('express-rate-limit');

// General API rate limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false,
  message: {
    status: 'error',
    message: 'Too many requests, please try again later.'
  },
  skip: (req) => {
    // Skip rate limiting for certain conditions (e.g., admin users)
    return req.user?.role === 'admin';
  }
});

// Strict limiter for authentication routes
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 requests per window
  message: {
    status: 'error',
    message: 'Too many login attempts, please try again in an hour.'
  }
});

module.exports = { apiLimiter, authLimiter };