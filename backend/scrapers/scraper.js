const vegaMoviesScraper = require('./vegamoviesScraper');
const bollyflixScraper = require('./bollyflixScraper');
const hdhub4uScraper = require('./hdhub4uScraper');
const Log = require('../models/Log');
const Movie = require('../models/Movie');

// Helper function to log scraper events
const logScraperAction = async (message, details = {}, status = 'info') => {
  try {
    await new Log({
      type: 'scraper',
      source: details.source || 'main-scraper',
      message,
      details,
      status
    }).save();
  } catch (error) {
    console.error('Error logging scraper action:', error);
  }
};

// Helper function to save movie data from scraper to database
const saveScrapedMovie = async (movieData, source) => {
  try {
    // Check if movie with same slug already exists
    const existingMovie = await Movie.findOne({ slug: movieData.slug });
    
    if (existingMovie) {
      // Update existing movie
      const updatedMovie = await Movie.findOneAndUpdate(
        { slug: movieData.slug },
        {
          ...movieData,
          source,
          updatedAt: Date.now()
        },
        { new: true }
      );
      
      await logScraperAction('Updated existing movie', {
        source,
        movieId: updatedMovie._id,
        title: updatedMovie.title
      }, 'success');
      
      return { updated: true, movie: updatedMovie };
    } else {
      // Create new movie
      const newMovie = new Movie({
        ...movieData,
        source,
        createdAt: Date.now(),
        updatedAt: Date.now()
      });
      
      await newMovie.save();
      
      await logScraperAction('Added new movie', {
        source,
        movieId: newMovie._id,
        title: newMovie.title
      }, 'success');
      
      return { updated: false, movie: newMovie };
    }
  } catch (error) {
    await logScraperAction('Failed to save scraped movie', {
      source,
      title: movieData.title,
      error: error.message
    }, 'error');
    
    throw error;
  }
};

// Run the VegaMovies scraper
const runVegaMoviesScraper = async () => {
  try {
    await logScraperAction('Starting VegaMovies scraper', { source: 'vegamovies' });
    
    const scrapedMovies = await vegaMoviesScraper.scrape();
    
    let newCount = 0;
    let updatedCount = 0;
    
    for (const movieData of scrapedMovies) {
      try {
        const result = await saveScrapedMovie(movieData, 'vegamovies');
        if (result.updated) {
          updatedCount++;
        } else {
          newCount++;
        }
      } catch (error) {
        console.error(`Error saving movie "${movieData.title}":`, error);
      }
    }
    
    await logScraperAction('VegaMovies scraper completed', {
      source: 'vegamovies',
      totalScraped: scrapedMovies.length,
      newMovies: newCount,
      updatedMovies: updatedCount
    }, 'success');
    
    return { source: 'vegamovies', newCount, updatedCount, totalScraped: scrapedMovies.length };
  } catch (error) {
    await logScraperAction('VegaMovies scraper failed', {
      source: 'vegamovies',
      error: error.message
    }, 'error');
    
    throw error;
  }
};

// Run the BollyFlix scraper
const runBollyflixScraper = async () => {
  try {
    await logScraperAction('Starting BollyFlix scraper', { source: 'bollyflix' });
    
    const scrapedMovies = await bollyflixScraper.scrape();
    
    let newCount = 0;
    let updatedCount = 0;
    
    for (const movieData of scrapedMovies) {
      try {
        const result = await saveScrapedMovie(movieData, 'bollyflix');
        if (result.updated) {
          updatedCount++;
        } else {
          newCount++;
        }
      } catch (error) {
        console.error(`Error saving movie "${movieData.title}":`, error);
      }
    }
    
    await logScraperAction('BollyFlix scraper completed', {
      source: 'bollyflix',
      totalScraped: scrapedMovies.length,
      newMovies: newCount,
      updatedMovies: updatedCount
    }, 'success');
    
    return { source: 'bollyflix', newCount, updatedCount, totalScraped: scrapedMovies.length };
  } catch (error) {
    await logScraperAction('BollyFlix scraper failed', {
      source: 'bollyflix',
      error: error.message
    }, 'error');
    
    throw error;
  }
};

// Run the HDHub4u scraper
const runHdhub4uScraper = async () => {
  try {
    await logScraperAction('Starting HDHub4u scraper', { source: 'hdhub4u' });
    
    const scrapedMovies = await hdhub4uScraper.scrape();
    
    let newCount = 0;
    let updatedCount = 0;
    
    for (const movieData of scrapedMovies) {
      try {
        const result = await saveScrapedMovie(movieData, 'hdhub4u');
        if (result.updated) {
          updatedCount++;
        } else {
          newCount++;
        }
      } catch (error) {
        console.error(`Error saving movie "${movieData.title}":`, error);
      }
    }
    
    await logScraperAction('HDHub4u scraper completed', {
      source: 'hdhub4u',
      totalScraped: scrapedMovies.length,
      newMovies: newCount,
      updatedMovies: updatedCount
    }, 'success');
    
    return { source: 'hdhub4u', newCount, updatedCount, totalScraped: scrapedMovies.length };
  } catch (error) {
    await logScraperAction('HDHub4u scraper failed', {
      source: 'hdhub4u',
      error: error.message
    }, 'error');
    
    throw error;
  }
};

// Run a specific scraper by name
const runScraperByName = async (scraperName) => {
  switch (scraperName.toLowerCase()) {
    case 'vegamovies':
      return await runVegaMoviesScraper();
    case 'bollyflix':
      return await runBollyflixScraper();
    case 'hdhub4u':
      return await runHdhub4uScraper();
    default:
      throw new Error(`Unknown scraper: ${scraperName}`);
  }
};

// Run all scrapers
const runAllScrapers = async () => {
  await logScraperAction('Starting all scrapers');
  
  const results = {
    vegamovies: null,
    bollyflix: null,
    hdhub4u: null,
    successful: 0,
    failed: 0,
    totalNew: 0,
    totalUpdated: 0
  };
  
  try {
    results.vegamovies = await runVegaMoviesScraper();
    results.successful++;
    results.totalNew += results.vegamovies.newCount;
    results.totalUpdated += results.vegamovies.updatedCount;
  } catch (error) {
    results.failed++;
    console.error('VegaMovies scraper error:', error);
  }
  
  try {
    results.bollyflix = await runBollyflixScraper();
    results.successful++;
    results.totalNew += results.bollyflix.newCount;
    results.totalUpdated += results.bollyflix.updatedCount;
  } catch (error) {
    results.failed++;
    console.error('BollyFlix scraper error:', error);
  }
  
  try {
    results.hdhub4u = await runHdhub4uScraper();
    results.successful++;
    results.totalNew += results.hdhub4u.newCount;
    results.totalUpdated += results.hdhub4u.updatedCount;
  } catch (error) {
    results.failed++;
    console.error('HDHub4u scraper error:', error);
  }
  
  const status = results.failed === 0 ? 'success' : 
                (results.successful === 0 ? 'error' : 'warning');
  
  await logScraperAction('All scrapers completed', {
    successfulScrapers: results.successful,
    failedScrapers: results.failed,
    newMovies: results.totalNew,
    updatedMovies: results.totalUpdated
  }, status);
  
  return results;
};

// Main function to run scrapers
const runScrapers = async (specificScraper = null) => {
  try {
    if (specificScraper) {
      return await runScraperByName(specificScraper);
    } else {
      return await runAllScrapers();
    }
  } catch (error) {
    console.error('Error running scrapers:', error);
    await logScraperAction('Error running scrapers', {
      error: error.message
    }, 'error');
    
    throw error;
  }
};

// If script is run directly (not imported)
if (require.main === module) {
  // Connect to the database first
  const mongoose = require('mongoose');
  const dotenv = require('dotenv');
  
  // Load environment variables
  dotenv.config();
  
  // Connect to MongoDB
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/movieflix', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('MongoDB connected successfully');
    
    try {
      // Get scraper name from command line args if provided
      const scraperName = process.argv[2];
      
      const results = await runScrapers(scraperName);
      console.log('Scraper Results:', JSON.stringify(results, null, 2));
      
      // Close the MongoDB connection
      await mongoose.connection.close();
      console.log('MongoDB connection closed');
    } catch (error) {
      console.error('Error:', error);
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
}

module.exports = runScrapers; 