const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Movie = require('../models/Movie');
const Log = require('../models/Log');
const authMiddleware = require('../middleware/auth');
const scraperController = require('../controllers/scraper');

// Logging utility function
const logAdminAction = async (message, data = {}, level = 'info') => {
  try {
    const log = new Log({
      type: 'admin',
      message,
      data,
      level
    });
    await log.save();
  } catch (error) {
    console.error('Error logging admin action:', error);
  }
};

// Protected route - Admin Dashboard Stats
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    // Count total movies
    const totalMovies = await Movie.countDocuments();

    // Count movies by category
    const moviesByCategory = await Movie.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Count movies by source
    const moviesBySource = await Movie.aggregate([
      { $group: { _id: '$source', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Get latest added movies
    const latestMovies = await Movie.find()
      .sort('-createdAt')
      .limit(5)
      .select('title posterUrl category views createdAt');

    // Get most viewed movies
    const mostViewedMovies = await Movie.find()
      .sort('-views')
      .limit(5)
      .select('title posterUrl category views');

    // Get recent logs
    const recentLogs = await Log.find()
      .sort('-timestamp')
      .limit(5);

    await logAdminAction('Admin dashboard stats fetched');

    res.json({
      success: true,
      stats: {
        totalMovies,
        moviesByCategory,
        moviesBySource,
        latestMovies,
        mostViewedMovies,
        recentLogs
      }
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    await logAdminAction('Error fetching admin stats', { error: error.message }, 'error');
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Admin Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Simple validation
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Please enter all fields' });
  }

  try {
    // For demo purposes, using environment variables or hardcoded credentials
    // In production, use a proper user model with hashed passwords
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    // Check if username is correct
    if (username !== adminUsername) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Check if password is correct (in production, use bcrypt.compare)
    if (password !== adminPassword) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    await logAdminAction('Admin login successful', { username });

    // Create JWT payload
    const payload = {
      user: {
        id: 'admin',
        isAdmin: true
      }
    };

    // Sign token
    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'movieflix-jwt-secret',
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({
          success: true,
          token,
          user: {
            username: adminUsername,
            isAdmin: true
          }
        });
      }
    );
  } catch (error) {
    console.error('Login error:', error);
    await logAdminAction('Error logging in', { error: error.message }, 'error');
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Protected route - Add new movie
router.post('/movies', authMiddleware, async (req, res) => {
  try {
    const movieData = req.body;
    
    // Simple validation
    if (!movieData.title) {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }

    // Create new movie
    const newMovie = new Movie(movieData);
    await newMovie.save();

    await logAdminAction('Movie added by admin', { 
      title: newMovie.title, 
      id: newMovie._id 
    });

    res.status(201).json({
      success: true,
      message: 'Movie added successfully',
      movie: newMovie
    });
  } catch (error) {
    console.error('Error adding movie:', error);
    await logAdminAction('Error adding movie', { error: error.message }, 'error');
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// Protected route - Update movie
router.put('/movies/:id', authMiddleware, async (req, res) => {
  try {
    const movieId = req.params.id;
    const updates = req.body;

    // Find and update movie
    const updatedMovie = await Movie.findByIdAndUpdate(
      movieId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedMovie) {
      await logAdminAction('Movie not found for update', { movieId }, 'warning');
      return res.status(404).json({ success: false, message: 'Movie not found' });
    }

    await logAdminAction('Movie updated by admin', { 
      movieId,
      title: updatedMovie.title,
      updatedFields: Object.keys(updates)
    }, 'success');
    
    res.json({
      success: true,
      message: 'Movie updated successfully',
      movie: updatedMovie
    });
  } catch (error) {
    console.error('Error updating movie:', error);
    await logAdminAction('Error updating movie', { 
      movieId,
      error: error.message,
      updateData: req.body
    }, 'error');
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// Protected route - Delete movie
router.delete('/movies/:id', authMiddleware, async (req, res) => {
  try {
    const movieId = req.params.id;

    // Find and delete movie
    const deletedMovie = await Movie.findByIdAndDelete(movieId);

    if (!deletedMovie) {
      await logAdminAction('Movie not found for deletion', { movieId }, 'warning');
      return res.status(404).json({ success: false, message: 'Movie not found' });
    }

    await logAdminAction('Movie deleted by admin', { 
      movieId,
      title: deletedMovie.title
    }, 'success');
    
    res.json({
      success: true,
      message: 'Movie deleted successfully',
      movieId
    });
  } catch (error) {
    console.error('Error deleting movie:', error);
    await logAdminAction('Error deleting movie', { 
      movieId,
      error: error.message
    }, 'error');
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// Get all movies for admin (more details, no pagination limit)
router.get('/movies', authMiddleware, async (req, res) => {
  try {
    const { limit = 50, page = 1, sort = '-createdAt' } = req.query;
    const skip = (page - 1) * limit;
    
    // Get all movies with full details
    const movies = await Movie.find()
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));
      
    const total = await Movie.countDocuments();
    
    await logAdminAction('Admin fetched movies list', { 
      page, limit, sort
    });
    
    res.json({
      success: true,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalMovies: total,
      movies
    });
  } catch (error) {
    console.error('Error fetching admin movies:', error);
    await logAdminAction('Error fetching admin movies', { error: error.message }, 'error');
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// Get single movie for admin with complete details
router.get('/movies/:id', authMiddleware, async (req, res) => {
  try {
    const movieId = req.params.id;
    
    // Find movie by ID
    const movie = await Movie.findById(movieId);
    
    if (!movie) {
      await logAdminAction('Movie not found in admin', { movieId }, 'warning');
      return res.status(404).json({ success: false, message: 'Movie not found' });
    }
    
    await logAdminAction('Admin fetched movie details', { movieId });
    
    res.json({
      success: true,
      movie
    });
  } catch (error) {
    console.error('Error fetching movie details:', error);
    await logAdminAction('Error fetching movie details for admin', { 
      movieId,
      error: error.message
    }, 'error');
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// Protected route - Run scraper
router.post('/scrape', authMiddleware, scraperController.runScraper);

// Get all logs
router.get('/logs', authMiddleware, async (req, res) => {
  try {
    const { limit = 50, page = 1, type = 'all', level = 'all' } = req.query;
    const skip = (page - 1) * limit;
    
    // Build query based on filters
    const query = {};
    
    if (type !== 'all') {
      query.type = type;
    }
    
    if (level !== 'all') {
      query.level = level;
    }
    
    // Get logs with pagination
    const logs = await Log.find(query)
      .sort('-timestamp')
      .skip(skip)
      .limit(parseInt(limit));
      
    const total = await Log.countDocuments(query);
    
    await logAdminAction('Admin fetched logs', { 
      page, limit, type, level
    });
    
    res.json({
      success: true,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalLogs: total,
      logs
    });
  } catch (error) {
    console.error('Error fetching logs:', error);
    await logAdminAction('Error fetching logs', { error: error.message }, 'error');
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

module.exports = router; 