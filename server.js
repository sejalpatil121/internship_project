const redis = require("redis");
const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

// Create Redis client
const redisClient = redis.createClient({
    host: "localhost",
    port: 6379
});

redisClient.on("error", (err) => {
    console.error("Redis error:", err);
});

app.post("/ask", async (req, res) => {
    const { url, question } = req.body;
    if (!url || !question) return res.status(400).json({ error: "Missing parameters" });

    const cacheKey = `qa:${url}:${question}`;

    // Check Redis cache first
    redisClient.get(cacheKey, async (err, cachedResponse) => {
        if (cachedResponse) {
            return res.json({ cached: true, response: JSON.parse(cachedResponse) });
        }

        // If no cache, call Flask API
        try {
            const response = await axios.post("http://localhost:5000/process", { url, question });
            redisClient.setex(cacheKey, 3600, JSON.stringify(response.data)); // Cache for 1 hour
            res.json(response.data);
        } catch (error) {
            res.status(500).json({ error: "Flask API error", details: error.message });
        }
    });
});

// Start server
app.listen(3000, () => console.log("Node.js server running on port 3000"));