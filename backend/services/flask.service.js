const axios = require('axios');
require('dotenv').config();

const FLASK_API_URL = process.env.FLASK_API_URL || 'http://localhost:5001/process';
exports.processQuestion = async (url, question) => {
    try {
      console.log("[DEBUG] Sending to Flask:", { url, question }); // Add this
      const response = await axios.post(FLASK_API_URL, {
        url,
        question
      });
      console.log("[DEBUG] Flask response:", response.data); // Add this
      return response.data;
    } catch (error) {
      console.error("[ERROR] Flask API error:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      throw new Error(error.response?.data?.error || 'Failed to process question');
    }
  
};