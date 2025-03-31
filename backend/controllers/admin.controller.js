const User = require('../models/user.model');
const ApiRequest = require('../models/apiRequest.model');

// User Management
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// System Monitoring
const calculateErrorRate = async () => {
    const totalRequests = await ApiRequest.countDocuments();
    if (totalRequests === 0) return 0; // Avoid division by zero
    const errorRequests = await ApiRequest.countDocuments({ status: { $gte: 400 } });
    return (errorRequests / totalRequests) * 100; // Return error rate as a percentage
  };
  
  const getSystemStats = async (req, res) => {
    try {
      const stats = {
        users: await User.countDocuments(),
        activeUsers: await User.countDocuments({ lastActive: { $gt: new Date(Date.now() - 24*60*60*1000) } }),
        apiRequests: await ApiRequest.countDocuments(),
        errorRate: await calculateErrorRate()
      };
      res.json(stats);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

// API Request Logs
const getApiLogs = async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const logs = await ApiRequest.find()
      .sort({ timestamp: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
      
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllUsers,
  getSystemStats,
  getApiLogs
};