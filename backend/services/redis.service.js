// backend/services/redis.service.js
const { createClient } = require('redis');

class RedisService {
  constructor() {
    this.client = createClient({
      url: `redis://${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || 6379}`
    });

    this.client.on('error', (err) => {
      console.error('Redis error:', err);
    });

    // Connect immediately
    this.client.connect();
  }

  async get(key) {
    try {
      return await this.client.get(key);
    } catch (err) {
      console.error('Redis get error:', err);
      return null;
    }
  }

  async setex(key, ttl, value) {
    try {
      return await this.client.setEx(key, ttl, value);
    } catch (err) {
      console.error('Redis setex error:', err);
      return false;
    }
  }
}

// Singleton instance
module.exports = new RedisService();