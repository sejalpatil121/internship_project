const ApiRequest = require('../models/apiRequest.model');

const logApiRequest = async (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', async () => {
    try {
      await ApiRequest.create({
        method: req.method,
        path: req.path,
        status: res.statusCode,
        duration: Date.now() - start,
        ip: req.ip,
        user: req.user?._id,
        userAgent: req.get('User-Agent')
      });
    } catch (err) {
      console.error('Failed to log API request:', err);
    }
  });

  next();
};

module.exports = logApiRequest;