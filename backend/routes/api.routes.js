// backend/routes/api.routes.js
const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth.middleware');
const { askQuestion } = require('../controllers/api.controller');
const rateLimiter = require('../middlewares/rateLimiter');

router.post('/ask', rateLimiter, authenticate, askQuestion); // Correct order

module.exports = router;