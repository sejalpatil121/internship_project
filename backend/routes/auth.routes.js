const express = require('express');
const router = express.Router();
const { register, login, getMe, registerAdmin, adminLogin } = require('../controllers/auth.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const rateLimiter = require('../middlewares/rateLimiter');

router.post('/register', rateLimiter, register);
router.post('/login', rateLimiter, login);
router.get('/me', authenticate, getMe);
router.post('/register-admin', registerAdmin);
router.post('/admin-login', adminLogin);

module.exports = router;