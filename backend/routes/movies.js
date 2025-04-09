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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    
    // Base query
    const query = {};
    
    // Apply filters if provided
    if (req.query.category) {
      query.categories = req.query.category;
    }
    
    if (req.query.language) {
      query.language = req.query.language;
    }
    
    if (req.query.genre) {
      query.genres = req.query.genre;
    }
    
    if (req.query.isSeries) {
      query.isSeries = req.query.isSeries === 'true';
    }
    
    // Get total count for pagination info
    const total = await Movie.countDocuments(query);
    
    // Get movies with pagination
    const movies = await Movie.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('title poster releaseDate rating genres language categories isSeries slug');
    
    await logApiRequest('Fetched movies list', { 
      page, limit, filters: req.query 
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
    console.error('Error fetching movies:', error);
    await logApiRequest('Error fetching movies', { error: error.message }, 'error');
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// GET featured movies
router.get('/featured', async (req, res) => {
  try {
    const featuredMovies = await Movie.find({ isFeatured: true })
      .sort({ updatedAt: -1 })
      .limit(10)
      .select('title poster backdrop releaseDate rating genres slug');
    
    await logApiRequest('Fetched featured movies');
    
    res.json({
      success: true,
      movies: featuredMovies
    });
  } catch (error) {
    console.error('Error fetching featured movies:', error);
    await logApiRequest('Error fetching featured movies', { error: error.message }, 'error');
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// GET trending movies
router.get('/trending', async (req, res) => {
  try {
    const trendingMovies = await Movie.find({ isTrending: true })
      .sort({ views: -1, updatedAt: -1 })
      .limit(12)
      .select('title poster releaseDate rating genres slug');
    
    await logApiRequest('Fetched trending movies');
    
    res.json({
      success: true,
      movies: trendingMovies
    });
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    await logApiRequest('Error fetching trending movies', { error: error.message }, 'error');
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// GET latest movies
router.get('/latest', async (req, res) => {
  try {
    const latestMovies = await Movie.find()
      .sort({ createdAt: -1 })
      .limit(12)
      .select('title poster releaseDate rating genres slug');
    
    await logApiRequest('Fetched latest movies');
    
    res.json({
      success: true,
      movies: latestMovies
    });
  } catch (error) {
    console.error('Error fetching latest movies:', error);
    await logApiRequest('Error fetching latest movies', { error: error.message }, 'error');
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// GET categories/genres list
router.get('/categories', async (req, res) => {
  try {
    // Aggregate all unique categories
    const categories = await Movie.distinct('categories');
    const genres = await Movie.distinct('genres');
    const languages = await Movie.distinct('language');
    
    await logApiRequest('Fetched categories, genres, and languages');
    
    res.json({
      success: true,
      categories,
      genres,
      languages
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    await logApiRequest('Error fetching categories', { error: error.message }, 'error');
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// GET movies by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    
    // Get total count for pagination info
    const total = await Movie.countDocuments({ categories: category });
    
    // Get movies in the category
    const movies = await Movie.find({ categories: category })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('title poster releaseDate rating genres language slug');
    
    await logApiRequest('Fetched movies by category', { category, page, limit });
    
    res.json({
      success: true,
      category,
      movies,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching movies by category:', error);
    await logApiRequest('Error fetching movies by category', { 
      category: req.params.category, 
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
    const { query, filters = {} } = req.body;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    
    let searchQuery = {};
    
    // If search query provided, use text search
    if (query && query.trim()) {
      searchQuery = { $text: { $search: query } };
    }
    
    // Apply additional filters
    if (filters.genres && filters.genres.length) {
      searchQuery.genres = { $in: filters.genres };
    }
    
    if (filters.language) {
      searchQuery.language = filters.language;
    }
    
    if (filters.categories && filters.categories.length) {
      searchQuery.categories = { $in: filters.categories };
    }
    
    if (filters.isSeries !== undefined) {
      searchQuery.isSeries = filters.isSeries;
    }
    
    // Get total count for pagination info
    const total = await Movie.countDocuments(searchQuery);
    
    // Sort options
    let sortOption = {};
    switch (filters.sort) {
      case 'newest':
        sortOption = { createdAt: -1 };
        break;
      case 'oldest':
        sortOption = { createdAt: 1 };
        break;
      case 'rating':
        sortOption = { rating: -1 };
        break;
      case 'views':
        sortOption = { views: -1 };
        break;
      default:
        // If text search is used, sort by relevance
        if (query && query.trim()) {
          sortOption = { score: { $meta: 'textScore' } };
        } else {
          sortOption = { createdAt: -1 };
        }
    }
    
    // Execute search
    let searchResults;
    if (query && query.trim()) {
      searchResults = await Movie.find(
        searchQuery,
        { score: { $meta: 'textScore' } }
      )
        .sort(sortOption)
        .skip(skip)
        .limit(limit)
        .select('title poster releaseDate rating genres language categories isSeries slug');
    } else {
      searchResults = await Movie.find(searchQuery)
        .sort(sortOption)
        .skip(skip)
        .limit(limit)
        .select('title poster releaseDate rating genres language categories isSeries slug');
    }
    
    await logApiRequest('Performed movie search', { 
      query, 
      filters, 
      resultsCount: searchResults.length 
    });
    
    res.json({
      success: true,
      query,
      filters,
      movies: searchResults,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error searching movies:', error);
    await logApiRequest('Error searching movies', { 
      query: req.body.query,
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