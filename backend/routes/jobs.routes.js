// backend/routes/jobs.routes.js
const express = require('express');
const { aiQueue } = require('../services/queue.service');
const router = express.Router();

router.get('/jobs/:id', async (req, res) => {
  try {
    const job = await aiQueue.getJob(req.params.id);

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    const state = await job.getState();

    res.json({
      id: job.id,
      status: state,
      progress: job.progress,
      result: job.returnvalue,
      error: job.failedReason,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;