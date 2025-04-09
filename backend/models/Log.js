const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['scraper', 'api', 'admin', 'system'],
    required: true
  },
  source: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  details: mongoose.Schema.Types.Mixed,
  status: {
    type: String,
    enum: ['success', 'info', 'warning', 'error'],
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Create index on timestamp for efficient sorting and querying
logSchema.index({ timestamp: -1 });

const Log = mongoose.model('Log', logSchema);

module.exports = Log; 