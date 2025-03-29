const express = require('express');
const router = express.Router();
const { askQuestion } = require('../controllers/api.controller');
const { authenticate } = require('../middlewares/auth.middleware');

router.post('/ask', authenticate, askQuestion);

module.exports = router;