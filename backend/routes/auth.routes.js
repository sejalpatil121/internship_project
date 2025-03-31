// backend/routes/auth.routes.js
const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/auth.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const rateLimiter = require('../middlewares/rateLimiter');

router.post('/register', rateLimiter, register); // Correct order
router.post('/login', rateLimiter, login);    // Correct order
router.get('/me', authenticate, getMe);

module.exports = router;