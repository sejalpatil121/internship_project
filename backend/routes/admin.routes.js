const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth.middleware');
const { authenticateAdmin } = require('../middlewares/admin.middleware');
const { 
  getAllUsers,
  getSystemStats,
  getApiLogs
} = require('../controllers/admin.controller');

router.use(authenticate);
router.use(authenticateAdmin);

router.get('/users', getAllUsers);
router.get('/stats', getSystemStats);
router.get('/logs', getApiLogs);

module.exports = router;