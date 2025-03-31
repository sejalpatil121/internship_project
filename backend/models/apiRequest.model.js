const mongoose = require('mongoose');

const apiRequestSchema = new mongoose.Schema({
  method: String,
  path: String,
  status: Number,
  duration: Number,
  ip: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userAgent: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ApiRequest', apiRequestSchema);