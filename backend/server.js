const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const cron = require('node-cron');

// Import routes
const movieRoutes = require('./routes/movies');
const adminRoutes = require('./routes/admin');

// Import scraper controller for scheduled runs
const { scheduledScraping } = require('./controllers/scraper');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/movies', movieRoutes);
app.use('/api/admin', adminRoutes);

// Static files for production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
  });
}

// Schedule automatic scraping (every day at midnight)
if (process.env.ENABLE_SCHEDULED_SCRAPING === 'true') {
  cron.schedule('0 0 * * *', async () => {
    console.log('Running scheduled scraping');
    try {
      await scheduledScraping();
    } catch (error) {
      console.error('Error in scheduled scraping:', error);
    }
  });
}

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/movieflix', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

connectDB();

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Server error',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  // In production, we might want to exit and let the process manager restart
  // process.exit(1);
}); 