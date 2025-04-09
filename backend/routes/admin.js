const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const Log = require('../models/Log');

// Logging utility function
const logAdminAction = async (message, details = {}, status = 'info') => {
  try {
    await new Log({
      type: 'admin',
      source: 'admin-api',
      message,
      details,
      status
    }).save();
  } catch (error) {
    console.error('Error logging admin action:', error);
  }
};

// GET dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const totalMovies = await Movie.countDocuments();
    const totalSeries = await Movie.countDocuments({ isSeries: true });
    const totalMoviesOnly = await Movie.countDocuments({ isSeries: false });
    
    // Get latest 5 movies added
    const latestMovies = await Movie.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title poster createdAt views downloads');
    
    // Get top 5 most viewed movies
    const mostViewed = await Movie.find()
      .sort({ views: -1 })
      .limit(5)
      .select('title poster views');
    
    // Get top 5 most downloaded movies
    const mostDownloaded = await Movie.find()
      .sort({ downloads: -1 })
      .limit(5)
      .select('title poster downloads');
    
    // Get counts by source
    const sourceStats = await Movie.aggregate([
      { $group: { _id: '$source', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    // Get most recent logs
    const recentLogs = await Log.find()
      .sort({ timestamp: -1 })
      .limit(10);
    
    await logAdminAction('Admin dashboard stats fetched');
    
    res.json({
      success: true,
      stats: {
        totalMovies,
        totalSeries,
        totalMoviesOnly,
        latestMovies,
        mostViewed,
        mostDownloaded,
        sourceStats,
        recentLogs
      }
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    await logAdminAction('Error fetching admin stats', { error: error.message }, 'error');
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// GET all movies for admin with pagination (includes all fields)
router.get('/movies', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;
    const skip = (page - 1) * limit;
    const searchQuery = req.query.search || '';
    
    // Base query
    let query = {};
    
    // Apply search if provided
    if (searchQuery) {
      query = { $text: { $search: searchQuery } };
    }
    
    // Get total count for pagination info
    const total = await Movie.countDocuments(query);
    
    // Get movies with pagination
    const movies = await Movie.find(
      query,
      searchQuery ? { score: { $meta: 'textScore' } } : {}
    )
      .sort(searchQuery ? { score: { $meta: 'textScore' } } : { updatedAt: -1 })
      .skip(skip)
      .limit(limit);
    
    await logAdminAction('Admin fetched movies list', { 
      page, limit, searchQuery
    });
    
    res.json({
      success: true,
      movies,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching movies for admin:', error);
    await logAdminAction('Error fetching movies for admin', { error: error.message }, 'error');
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// GET single movie for admin
router.get('/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    
    if (!movie) {
      await logAdminAction('Movie not found in admin', { movieId: req.params.id }, 'warning');
      return res.status(404).json({ success: false, message: 'Movie not found' });
    }
    
    await logAdminAction('Admin fetched movie details', { movieId: req.params.id });
    
    res.json({
      success: true,
      movie
    });
  } catch (error) {
    console.error('Error fetching movie details for admin:', error);
    await logAdminAction('Error fetching movie details for admin', { 
      movieId: req.params.id, 
      error: error.message 
    }, 'error');
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// POST create new movie
router.post('/movies', async (req, res) => {
  try {
    const movieData = req.body;
    
    // Check if movie with same slug already exists
    const existingMovie = await Movie.findOne({ slug: movieData.slug });
    if (existingMovie) {
      await logAdminAction('Failed to create movie - slug already exists', { 
        slug: movieData.slug 
      }, 'warning');
      return res.status(400).json({ 
        success: false, 
        message: 'A movie with this slug already exists' 
      });
    }
    
    // Set source as 'manual' for admin-created movies
    movieData.source = 'manual';
    
    // Create new movie
    const newMovie = new Movie(movieData);
    await newMovie.save();
    
    await logAdminAction('New movie created by admin', { 
      movieId: newMovie._id,
      title: newMovie.title
    }, 'success');
    
    res.status(201).json({
      success: true,
      message: 'Movie created successfully',
      movie: newMovie
    });
  } catch (error) {
    console.error('Error creating movie:', error);
    await logAdminAction('Error creating movie', { 
      error: error.message,
      movieData: req.body
    }, 'error');
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// PUT update movie
router.put('/movies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // Check if updating slug and if it conflicts
    if (updateData.slug) {
      const existingMovieWithSlug = await Movie.findOne({ 
        slug: updateData.slug,
        _id: { $ne: id } // Exclude current movie from check
      });
      
      if (existingMovieWithSlug) {
        await logAdminAction('Failed to update movie - slug already exists', { 
          slug: updateData.slug 
        }, 'warning');
        return res.status(400).json({ 
          success: false, 
          message: 'Another movie with this slug already exists' 
        });
      }
    }
    
    // Update the movie
    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedMovie) {
      await logAdminAction('Movie not found for update', { movieId: id }, 'warning');
      return res.status(404).json({ success: false, message: 'Movie not found' });
    }
    
    await logAdminAction('Movie updated by admin', { 
      movieId: id,
      title: updatedMovie.title,
      updatedFields: Object.keys(updateData)
    }, 'success');
    
    res.json({
      success: true,
      message: 'Movie updated successfully',
      movie: updatedMovie
    });
  } catch (error) {
    console.error('Error updating movie:', error);
    await logAdminAction('Error updating movie', { 
      movieId: req.params.id, 
      error: error.message,
      updateData: req.body
    }, 'error');
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// DELETE movie
router.delete('/movies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find movie first to get details for logging
    const movie = await Movie.findById(id);
    
    if (!movie) {
      await logAdminAction('Movie not found for deletion', { movieId: id }, 'warning');
      return res.status(404).json({ success: false, message: 'Movie not found' });
    }
    
    // Delete the movie
    await Movie.findByIdAndDelete(id);
    
    await logAdminAction('Movie deleted by admin', { 
      movieId: id,
      title: movie.title
    }, 'success');
    
    res.json({
      success: true,
      message: 'Movie deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting movie:', error);
    await logAdminAction('Error deleting movie', { 
      movieId: req.params.id, 
      error: error.message
    }, 'error');
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// GET logs with pagination and filtering
router.get('/logs', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;
    const type = req.query.type; // 'scraper', 'api', 'admin', 'system'
    const status = req.query.status; // 'success', 'info', 'warning', 'error'
    const source = req.query.source;
    
    // Build query based on filters
    const query = {};
    if (type) query.type = type;
    if (status) query.status = status;
    if (source) query.source = source;
    
    // Get total count for pagination info
    const total = await Log.countDocuments(query);
    
    // Get logs with pagination
    const logs = await Log.find(query)
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit);
    
    await logAdminAction('Admin fetched logs', { 
      page, limit, filters: { type, status, source }
    });
    
    res.json({
      success: true,
      logs,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching logs:', error);
    await logAdminAction('Error fetching logs', { error: error.message }, 'error');
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// GET scraper sources info
router.get('/scraper/sources', async (req, res) => {
  try {
    const sources = [
      { id: 'vegamovies', name: 'VegaMovies', url: 'https://vegamovies.day' },
      { id: 'bollyflix', name: 'BollyFlix', url: 'https://bollyflix.day' },
      { id: 'hdhub4u', name: 'HDHub4u', url: 'https://hdhub4u.bio' }
    ];
    
    // Get movie counts by source
    const sourceStats = await Movie.aggregate([
      { $group: { _id: '$source', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    // Get latest scraper logs
    const scraperLogs = await Log.find({ type: 'scraper' })
      .sort({ timestamp: -1 })
      .limit(10);
    
    await logAdminAction('Admin fetched scraper sources info');
    
    res.json({
      success: true,
      sources,
      sourceStats,
      scraperLogs
    });
  } catch (error) {
    console.error('Error fetching scraper sources info:', error);
    await logAdminAction('Error fetching scraper sources info', { error: error.message }, 'error');
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// POST run scraper manually
router.post('/scraper/run', async (req, res) => {
  try {
    const { source } = req.body;
    
    if (!source) {
      return res.status(400).json({ 
        success: false, 
        message: 'Source parameter is required' 
      });
    }
    
    // This would normally queue the scraper job
    // Here we'll just log that it was requested
    await logAdminAction('Manual scraper run requested', { source }, 'info');
    
    // In a real implementation, you would start the scraper here
    // For example: runScraper(source);
    
    res.json({
      success: true,
      message: `Scraper for ${source} has been queued to run`,
    });
  } catch (error) {
    console.error('Error running scraper manually:', error);
    await logAdminAction('Error running scraper manually', { 
      source: req.body.source,
      error: error.message
    }, 'error');
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

module.exports = router; 