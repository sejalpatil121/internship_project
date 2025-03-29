// backend/routes/api.routes.js
const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth.middleware');
const { askQuestion } = require('../controllers/api.controller');

router.post('/ask', authenticate, askQuestion);

module.exports = router;