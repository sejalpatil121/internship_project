const { processQuestion } = require('../services/flask.service');
const redisService = require('../services/redis.service');

exports.askQuestion = async (req, res) => {
  try {
    const { url, question } = req.body;

    // Input validation
    if (!url || !question) {
      return res.status(400).json({
        error: 'Both URL and question are required.',
      });
    }

    const cacheKey = `qa:${url}:${question}`;

    // Check cache
    const cached = await redisService.get(cacheKey);
    if (cached) {
      return res.json({
        cached: true,
        response: JSON.parse(cached),
      });
    }

    // Process the question directly
    const response = await processQuestion(url, question);

    // Cache the result
    await redisService.setex(cacheKey, 3600, JSON.stringify(response)); // Cache for 1 hour

    // Respond with the result
    res.json({
      cached: false,
      response,
    });
  } catch (error) {
    console.error('Error in askQuestion:', error);
    res.status(500).json({
      error: error.message || 'Failed to process question',
    });
  }
};