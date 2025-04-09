const Movie = require('../models/Movie');
const Log = require('../models/Log');

// Logging utility
const logScraperAction = async (message, data = {}, level = 'info') => {
  try {
    const log = new Log({
      type: 'scraper',
      message,
      data,
      level
    });
    await log.save();
  } catch (error) {
    console.error('Error logging scraper action:', error);
  }
};

// Mock scraper for VegaMovies (in a real app, this would use a proper web scraper)
const scrapeVegaMovies = async () => {
  // Simulating delay of scraping process
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock data for demonstration
  const mockMovies = [
    {
      title: 'The Avengers',
      description: 'When an unexpected enemy emerges that threatens global safety and security, Nick Fury, Director of the international peacekeeping agency known as S.H.I.E.L.D., finds himself in need of a team to pull the world back from the brink of disaster.',
      year: 2012,
      duration: 143,
      posterUrl: 'https://example.com/avengers-poster.jpg',
      trailerUrl: 'https://www.youtube.com/watch?v=eOrNdBpGMv8',
      director: 'Joss Whedon',
      cast: ['Robert Downey Jr.', 'Chris Evans', 'Scarlett Johansson'],
      category: 'VegaMovies',
      source: 'vegamovies'
    },
    {
      title: 'Inception',
      description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
      year: 2010,
      duration: 148,
      posterUrl: 'https://example.com/inception-poster.jpg',
      trailerUrl: 'https://www.youtube.com/watch?v=YoHD9XEInc0',
      director: 'Christopher Nolan',
      cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Ellen Page'],
      category: 'VegaMovies',
      source: 'vegamovies'
    }
  ];
  
  return mockMovies;
};

// Mock scraper for BollyFlix 
const scrapeBollyFlix = async () => {
  // Simulating delay of scraping process
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock data for demonstration
  const mockMovies = [
    {
      title: 'Baahubali: The Beginning',
      description: 'In ancient India, an adventurous and daring man becomes involved in a decades-old feud between warring kingdoms.',
      year: 2015,
      duration: 159,
      posterUrl: 'https://example.com/baahubali-poster.jpg',
      trailerUrl: 'https://www.youtube.com/watch?v=sOEg_YZQsTI',
      director: 'S.S. Rajamouli',
      cast: ['Prabhas', 'Rana Daggubati', 'Anushka Shetty'],
      category: 'BollyFlix',
      source: 'bollyflix'
    },
    {
      title: 'Dangal',
      description: 'Former wrestler Mahavir Singh Phogat and his two wrestler daughters struggle towards glory at the Commonwealth Games in the face of societal oppression.',
      year: 2016,
      duration: 161,
      posterUrl: 'https://example.com/dangal-poster.jpg',
      trailerUrl: 'https://www.youtube.com/watch?v=x_7YlGv9u1g',
      director: 'Nitesh Tiwari',
      cast: ['Aamir Khan', 'Sakshi Tanwar', 'Fatima Sana Shaikh'],
      category: 'BollyFlix',
      source: 'bollyflix'
    }
  ];
  
  return mockMovies;
};

// Manually trigger scraper from admin panel
exports.runScraper = async (req, res) => {
  try {
    const { source } = req.body;
    
    if (!source) {
      return res.status(400).json({ 
        success: false, 
        message: 'Source parameter is required' 
      });
    }
    
    // Log the scraping start
    await logScraperAction(`Manual scraping started for ${source}`);
    
    let scrapedMovies = [];
    let newMoviesCount = 0;
    let updatedMoviesCount = 0;
    
    // Run the appropriate scraper based on source
    if (source === 'vegamovies' || source === 'all') {
      const vegaMovies = await scrapeVegaMovies();
      scrapedMovies = [...scrapedMovies, ...vegaMovies];
      
      // Process VegaMovies results
      for (const movie of vegaMovies) {
        // Check if movie already exists
        const existingMovie = await Movie.findOne({ 
          title: movie.title,
          year: movie.year 
        });
        
        if (existingMovie) {
          // Update existing movie
          await Movie.findByIdAndUpdate(
            existingMovie._id,
            { 
              $set: {
                ...movie,
                updatedAt: Date.now()
              }
            }
          );
          updatedMoviesCount++;
        } else {
          // Create new movie
          const newMovie = new Movie(movie);
          await newMovie.save();
          newMoviesCount++;
        }
      }
    }
    
    if (source === 'bollyflix' || source === 'all') {
      const bollyFlixMovies = await scrapeBollyFlix();
      scrapedMovies = [...scrapedMovies, ...bollyFlixMovies];
      
      // Process BollyFlix results
      for (const movie of bollyFlixMovies) {
        // Check if movie already exists
        const existingMovie = await Movie.findOne({ 
          title: movie.title,
          year: movie.year 
        });
        
        if (existingMovie) {
          // Update existing movie
          await Movie.findByIdAndUpdate(
            existingMovie._id,
            { 
              $set: {
                ...movie,
                updatedAt: Date.now()
              }
            }
          );
          updatedMoviesCount++;
        } else {
          // Create new movie
          const newMovie = new Movie(movie);
          await newMovie.save();
          newMoviesCount++;
        }
      }
    }
    
    // Log the scraping completion
    await logScraperAction(`Manual scraping completed for ${source}`, {
      totalScraped: scrapedMovies.length,
      newMovies: newMoviesCount,
      updatedMovies: updatedMoviesCount
    });
    
    res.json({
      success: true,
      message: `Scraping completed for ${source}`,
      stats: {
        totalScraped: scrapedMovies.length,
        newMovies: newMoviesCount,
        updatedMovies: updatedMoviesCount
      }
    });
  } catch (error) {
    console.error('Error running scraper:', error);
    await logScraperAction('Error running scraper', { error: error.message }, 'error');
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message
    });
  }
};

// Function for scheduled automatic scraping (to be called by a cron job)
exports.scheduledScraping = async () => {
  try {
    await logScraperAction('Scheduled scraping started');
    
    // Run all scrapers
    const vegaMovies = await scrapeVegaMovies();
    const bollyFlixMovies = await scrapeBollyFlix();
    
    const allScrapedMovies = [...vegaMovies, ...bollyFlixMovies];
    let newMoviesCount = 0;
    let updatedMoviesCount = 0;
    
    // Process all scraped movies
    for (const movie of allScrapedMovies) {
      // Check if movie already exists
      const existingMovie = await Movie.findOne({ 
        title: movie.title,
        year: movie.year 
      });
      
      if (existingMovie) {
        // Update existing movie
        await Movie.findByIdAndUpdate(
          existingMovie._id,
          { 
            $set: {
              ...movie,
              updatedAt: Date.now()
            }
          }
        );
        updatedMoviesCount++;
      } else {
        // Create new movie
        const newMovie = new Movie(movie);
        await newMovie.save();
        newMoviesCount++;
      }
    }
    
    await logScraperAction('Scheduled scraping completed', {
      totalScraped: allScrapedMovies.length,
      newMovies: newMoviesCount,
      updatedMovies: updatedMoviesCount
    });
    
    console.log('Scheduled scraping completed successfully');
    return {
      success: true,
      stats: {
        totalScraped: allScrapedMovies.length,
        newMovies: newMoviesCount,
        updatedMovies: updatedMoviesCount
      }
    };
  } catch (error) {
    console.error('Error in scheduled scraping:', error);
    await logScraperAction('Error in scheduled scraping', { error: error.message }, 'error');
    return {
      success: false,
      error: error.message
    };
  }
}; 