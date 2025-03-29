const { processQuestion } = require('../services/flask.service');

exports.askQuestion = async (req, res) => {
  try {
    const { url, question } = req.body;
    
    if (!url || !question) {
      return res.status(400).json({ error: 'URL and question are required' });
    }

    const result = await processQuestion(url, question);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};