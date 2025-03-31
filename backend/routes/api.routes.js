const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth.middleware');
const { askQuestion } = require('../controllers/api.controller');
const { apiLimiter } = require('../middlewares/rateLimiter');

// Apply rate limiting to all API routes
router.use(apiLimiter);

router.post('/ask', authenticate, askQuestion);

module.exports = router;