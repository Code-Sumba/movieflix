const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cron = require('node-cron');
const dotenv = require('dotenv');
const path = require('path');

// Import routes
const movieRoutes = require('./routes/movies');
const adminRoutes = require('./routes/admin');

// Import scrapers
const runScrapers = require('./scrapers/scraper');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB (using environment variable)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/movieflix', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/movies', movieRoutes);
app.use('/api/admin', adminRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
  });
}

// Schedule scrapers to run every 6 hours (0 */6 * * *)
cron.schedule('0 */6 * * *', async () => {
  console.log('Running scheduled scrapers...');
  try {
    await runScrapers();
    console.log('Scrapers completed successfully');
  } catch (error) {
    console.error('Error running scrapers:', error);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 