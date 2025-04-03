// backend/worker.js
require('dotenv').config();
const { Worker } = require('bullmq');
const IORedis = require('ioredis');
const { processQuestion } = require('./services/flask.service');
const redisService = require('./services/redis.service'); // Import Redis service

const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379');

new Worker(
  'ai-processing',
  async (job) => {
    console.log(`Processing job ${job.id}`);
    const { url, question } = job.data;
    const cacheKey = `qa:${url}:${question}`;

    try {
      const response = await processQuestion(url, question);

      // Cache the response in Redis
      await redisService.setex(cacheKey, 3600, JSON.stringify(response));

      return response; // Return the response to BullMQ
    } catch (error) {
      console.error(`Job ${job.id} failed:`, error);
      throw error;
    }
  },
  { connection }
);

console.log('Worker started...');