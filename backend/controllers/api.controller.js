// backend/controllers/api.controller.js
const { processQuestion } = require('../services/flask.service');
const redisService = require('../services/redis.service');
const { addAIJob } = require('../services/queue.service');

exports.askQuestion = async (req, res) => {
  try {
    const { url, question } = req.body;
    const cacheKey = `qa:${url}:${question}`;

    // Check cache
    const cached = await redisService.get(cacheKey);
    if (cached) {
      return res.json({
        cached: true,
        response: JSON.parse(cached),
      });
    }

    // Add job to queue
    const job = await addAIJob({
      url,
      question,
    });

    // Respond with job details
    res.json({
      jobId: job.id,
      statusUrl: `/api/jobs/${job.id}`,
      message: 'Processing started',
    });

    // The worker will process the job, cache the result, and complete.
  } catch (error) {
    console.error('Error in askQuestion:', error);
    res.status(500).json({
      error: error.message || 'Failed to process question',
    });
  }
};