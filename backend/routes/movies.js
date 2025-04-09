const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const Log = require('../models/Log');

// Logging utility function
const logApiRequest = async (message, details = {}, status = 'info') => {
  try {
    await new Log({
      type: 'api',
      source: 'movie-api',
      message,
      details,
      status
    }).save();
  } catch (error) {
    console.error('Error logging API request:', error);
  }
};

// GET all movies with pagination
router.get('/', async (req, res) => {
  try {
    const { limit = 20, page = 1, sort = '-createdAt' } = req.query;
    const skip = (page - 1) * limit;
    
    const movies = await Movie.find({ isActive: true })
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));
      
    const total = await Movie.countDocuments({ isActive: true });
    
    await logApiRequest('Fetched movies list', { 
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
    console.error('Error fetching movies:', error);
    await logApiRequest('Error fetching movies', { error: error.message }, 'error');
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// GET featured movies
router.get('/featured', async (req, res) => {
  try {
    const movies = await Movie.find({ isActive: true, isFeatured: true })
      .sort('-createdAt')
      .limit(10);
    
    await logApiRequest('Fetched featured movies');
    
    res.json({ success: true, movies });
  } catch (error) {
    console.error('Error fetching featured movies:', error);
    await logApiRequest('Error fetching featured movies', { error: error.message }, 'error');
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// GET trending movies
router.get('/trending', async (req, res) => {
  try {
    const movies = await Movie.find({ isActive: true, isTrending: true })
      .sort('-views')
      .limit(10);
    
    await logApiRequest('Fetched trending movies');
    
    res.json({ success: true, movies });
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    await logApiRequest('Error fetching trending movies', { error: error.message }, 'error');
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// GET latest movies
router.get('/latest', async (req, res) => {
  try {
    const movies = await Movie.find({ isActive: true })
      .sort('-createdAt')
      .limit(10);
    
    await logApiRequest('Fetched latest movies');
    
    res.json({ success: true, movies });
  } catch (error) {
    console.error('Error fetching latest movies:', error);
    await logApiRequest('Error fetching latest movies', { error: error.message }, 'error');
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// GET categories/genres list
router.get('/categories', async (req, res) => {
  try {
    const categories = await Movie.distinct('category', { isActive: true });
    res.json({ success: true, categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    await logApiRequest('Error fetching categories', { error: error.message }, 'error');
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// GET movies by category
router.get('/category/:categoryName', async (req, res) => {
  try {
    const { categoryName } = req.params;
    const { limit = 20, page = 1, sort = '-createdAt' } = req.query;
    const skip = (page - 1) * limit;
    
    const movies = await Movie.find({ 
      isActive: true, 
      category: categoryName 
    })
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));
      
    const total = await Movie.countDocuments({ 
      isActive: true, 
      category: categoryName 
    });
    
    await logApiRequest('Fetched movies by category', { category: categoryName, page, limit });
    
    res.json({
      success: true,
      category: categoryName,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalMovies: total,
      movies
    });
  } catch (error) {
    console.error(`Error fetching movies for category ${req.params.categoryName}:`, error);
    await logApiRequest('Error fetching movies by category', { 
      category: req.params.categoryName, 
      error: error.message 
    }, 'error');
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// GET single movie by slug
router.get('/movie/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    
    // Find movie and increment views
    const movie = await Movie.findOneAndUpdate(
      { slug },
      { $inc: { views: 1 } },
      { new: true }
    );
    
    if (!movie) {
      await logApiRequest('Movie not found', { slug }, 'warning');
      return res.status(404).json({ success: false, message: 'Movie not found' });
    }
    
    await logApiRequest('Fetched movie details', { movieId: movie._id, slug });
    
    res.json({
      success: true,
      movie
    });
  } catch (error) {
    console.error('Error fetching movie details:', error);
    await logApiRequest('Error fetching movie details', { 
      slug: req.params.slug, 
      error: error.message 
    }, 'error');
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// POST search movies
router.post('/search', async (req, res) => {
  try {
    const { q, limit = 20, page = 1 } = req.query;
    const skip = (page - 1) * limit;
    
    if (!q) {
      return res.status(400).json({ success: false, message: 'Search query is required' });
    }
    
    const movies = await Movie.find(
      { 
        $text: { $search: q },
        isActive: true
      },
      { score: { $meta: 'textScore' } }
    )
      .sort({ score: { $meta: 'textScore' } })
      .skip(skip)
      .limit(parseInt(limit));
      
    const total = await Movie.countDocuments(
      { 
        $text: { $search: q },
        isActive: true
      }
    );
    
    await logApiRequest('Performed movie search', { 
      query: q, 
      resultsCount: movies.length 
    });
    
    res.json({
      success: true,
      query: q,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalResults: total,
      movies
    });
  } catch (error) {
    console.error('Error searching movies:', error);
    await logApiRequest('Error searching movies', { 
      query: req.query.q,
      error: error.message 
    }, 'error');
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// PUT update download count
router.put('/download/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const movie = await Movie.findByIdAndUpdate(
      id,
      { $inc: { downloads: 1 } },
      { new: true }
    );
    
    if (!movie) {
      await logApiRequest('Movie not found for download tracking', { movieId: id }, 'warning');
      return res.status(404).json({ success: false, message: 'Movie not found' });
    }
    
    await logApiRequest('Updated movie download count', { 
      movieId: id, 
      newCount: movie.downloads 
    });
    
    res.json({
      success: true,
      downloads: movie.downloads
    });
  } catch (error) {
    console.error('Error updating download count:', error);
    await logApiRequest('Error updating download count', { 
      movieId: req.params.id, 
      error: error.message 
    }, 'error');
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

module.exports = router; 