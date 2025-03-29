// backend/controllers/api.controller.js
const { processQuestion } = require('../services/flask.service');
const redisService = require('../services/redis.service');

exports.askQuestion = async (req, res) => {
  try {
    const { url, question } = req.body;
    const cacheKey = `qa:${url}:${question}`;

    // Check cache
    const cached = await redisService.get(cacheKey);
    if (cached) {
      return res.json({
        cached: true,
        response: JSON.parse(cached)
      });
    }

    // Process new request
    const response = await processQuestion(url, question);
    
    // Cache response (1 hour)
    await redisService.setex(cacheKey, 3600, JSON.stringify(response));
    
    res.json(response);
  } catch (error) {
    console.error('Error in askQuestion:', error);
    res.status(500).json({
      error: error.message || 'Failed to process question'
    });
  }
};