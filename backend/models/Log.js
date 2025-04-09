const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['admin', 'scraper', 'api', 'system', 'user'],
    required: true
  },
  message: {
    type: String,
    required: true
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  level: {
    type: String,
    enum: ['info', 'success', 'warning', 'error'],
    default: 'info'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Add indexes for frequent queries
logSchema.index({ timestamp: -1 });
logSchema.index({ type: 1, timestamp: -1 });
logSchema.index({ level: 1, timestamp: -1 });

const Log = mongoose.model('Log', logSchema);

module.exports = Log; 