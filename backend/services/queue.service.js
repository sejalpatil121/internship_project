/*const { Queue, Worker } = require('bullmq');
const IORedis = require('ioredis');
const { processWithGemini } = require('./ai.service'); // Your AI processing function
require('./services/queue.service');
// Redis connection - use environment variable in production
const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379');

// Create the queue
const aiQueue = new Queue('ai-processing', {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 1000
    }
  }
});

// Create the worker
const worker = new Worker('ai-processing', async job => {
  console.log(`Processing job ${job.id}`);
  const { url, question } = job.data;
  
  try {
    const result = await processWithGemini(url, question);
    return result;
  } catch (error) {
    console.error(`Job ${job.id} failed:`, error);
    throw error; // Will trigger retry
  }
}, { connection });

// Helper function to add jobs
const addAIJob = async (data) => {
  return await aiQueue.add('process', data);
};

module.exports = {
  aiQueue,
  addAIJob
};
*/


// const { Queue } = require('bullmq');
// const IORedis = require('ioredis');

// const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379');
// const aiQueue = new Queue('ai-processing', { connection });

// const addAIJob = async (jobData) => {
//   return await aiQueue.add('process-question', jobData, {
//     attempts: 3, // Retry failed jobs up to 3 times
//     backoff: 5000, // Wait 5 seconds between retries
//   });
// };

// module.exports = {
//   aiQueue,
//   addAIJob,
// };