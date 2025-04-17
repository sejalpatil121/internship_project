// backend/services/flask.service.js
const axios = require('axios');
require('dotenv').config();

const FLASK_API_URL = process.env.FLASK_API_URL || 'http://localhost:5001/process';
const TIMEOUT = process.env.FLASK_TIMEOUT || 20000; // 10 seconds

exports.processQuestion = async (url, question) => {
    try {
        const response = await axios.post(FLASK_API_URL, {
            url,
            question
        }, {
            timeout: TIMEOUT,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Flask API error:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data
        });
        throw new Error(error.response?.data?.error || 'Failed to process question');
    }
};