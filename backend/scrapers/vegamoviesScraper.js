const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

// Base URL for VegaMovies
const BASE_URL = 'https://vegamovies.day';

// Helper function to generate a slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Helper function to extract movie quality and size from text
const extractQualityAndSize = (text) => {
  const qualityMatch = text.match(/\b(480p|720p|1080p|2160p|4K)\b/i);
  const sizeMatch = text.match(/\b(\d+(?:\.\d+)?\s*(?:GB|MB))\b/i);
  
  return {
    quality: qualityMatch ? qualityMatch[0].toLowerCase() : 'Other',
    size: sizeMatch ? sizeMatch[0] : 'Unknown'
  };
};

// Helper function to extract release year from title or text
const extractReleaseYear = (text) => {
  const yearMatch = text.match(/\b(19|20)\d{2}\b/);
  return yearMatch ? parseInt(yearMatch[0]) : new Date().getFullYear();
};

// Helper to extract genres from categories or tags
const extractGenres = (categoryText) => {
  const commonGenres = [
    'Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime',
    'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 'Horror',
    'Musical', 'Mystery', 'Romance', 'Sci-Fi', 'Sport', 'Thriller',
    'War', 'Western'
  ];
  
  const genres = [];
  
  for (const genre of commonGenres) {
    if (categoryText.includes(genre)) {
      genres.push(genre);
    }
  }
  
  return genres.length > 0 ? genres : ['Drama']; // Default genre
};

// Helper to extract language from text
const extractLanguage = (text) => {
  const languages = ['Hindi', 'English', 'Tamil', 'Telugu', 'Malayalam', 'Kannada', 'Bengali', 'Marathi'];
  
  for (const language of languages) {
    if (text.includes(language)) {
      return language;
    }
  }
  
  return 'Hindi'; // Default language
};

// Scrape movie details from a single movie page
const scrapeMovieDetails = async (url) => {
  try {
    // Use Puppeteer for JavaScript-rendered content and to bypass simple protections
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    
    // Get the page content
    const content = await page.content();
    const $ = cheerio.load(content);
    
    // Extract movie title
    let title = $('.entry-title').text().trim();
    title = title.replace(/download/i, '').replace(/\(\d{4}\)/, '').trim();
    
    // Extract release year
    const releaseYear = extractReleaseYear(title + ' ' + $('.entry-content').text());
    
    // Create release date (just the year for now)
    const releaseDate = new Date(releaseYear, 0, 1);
    
    // Extract movie poster
    const posterUrl = $('.entry-content img').first().attr('src') || '';
    
    // Extract description
    let description = $('.entry-content p').slice(0, 3).text().trim();
    if (!description || description.length < 50) {
      // Try another selector or combine paragraphs
      description = '';
      $('.entry-content p').each((i, el) => {
        if (i < 5) description += $(el).text() + ' ';
      });
      description = description.trim();
    }
    
    // Extract categories and genres
    const categoryText = $('.cat-links').text() + ' ' + $('.tags-links').text();
    const genres = extractGenres(categoryText);
    
    // Extract language
    const language = extractLanguage(title + ' ' + categoryText + ' ' + description);
    
    // Determine if it's a series
    const isSeries = /series|season|episode|tv show/i.test(title + ' ' + description);
    
    // Extract download links
    const downloadLinks = [];
    
    // Look for download buttons or links
    $('.entry-content a[href*="download"]').each((i, el) => {
      const linkText = $(el).text().trim();
      const linkUrl = $(el).attr('href');
      
      if (linkUrl && linkText && !linkUrl.includes('comment') && !linkUrl.includes('#')) {
        const { quality, size } = extractQualityAndSize(linkText + ' ' + $(el).parent().text());
        
        downloadLinks.push({
          quality,
          size,
          provider: 'vegamovies',
          url: linkUrl
        });
      }
    });
    
    // If we don't find links with 'download' in URL, try any link that might be a download
    if (downloadLinks.length === 0) {
      $('.entry-content a').each((i, el) => {
        const linkText = $(el).text().trim();
        const linkUrl = $(el).attr('href');
        
        if (linkUrl && linkText && 
            !linkUrl.includes('comment') && 
            !linkUrl.includes('#') &&
            !linkUrl.includes('vegamovies') &&
            (linkText.includes('Download') || linkText.includes('480p') || 
             linkText.includes('720p') || linkText.includes('1080p'))) {
          
          const { quality, size } = extractQualityAndSize(linkText + ' ' + $(el).parent().text());
          
          downloadLinks.push({
            quality,
            size,
            provider: 'vegamovies',
            url: linkUrl
          });
        }
      });
    }
    
    // Close browser
    await browser.close();
    
    // Create slug from title
    const slug = generateSlug(title);
    
    // Determine categories based on content
    const categories = [];
    
    if (language === 'Hindi') categories.push('Hindi');
    if (language === 'English') categories.push('English');
    if (/south|tamil|telugu|malayalam|kannada/i.test(title + description)) categories.push('South');
    if (/dubb?ed/i.test(title + description)) categories.push('Dubbed');
    if (isSeries) categories.push('Web Series');
    
    // Set default category if none determined
    if (categories.length === 0) {
      if (language === 'Hindi') categories.push('Hindi');
      else if (language === 'English') categories.push('English');
      else categories.push('Others');
    }
    
    // Construct the movie object
    const movie = {
      title,
      slug,
      description,
      poster: posterUrl,
      releaseDate,
      duration: 120, // Default duration (minutes)
      genres,
      language,
      rating: 0, // Default rating
      downloadLinks,
      categories,
      isSeries,
      totalSeasons: isSeries ? 1 : 0,
      totalEpisodes: isSeries ? 1 : 0,
      isFeatured: false,
      isTrending: false,
      sourceUrl: url
    };
    
    return movie;
  } catch (error) {
    console.error(`Error scraping movie details from ${url}:`, error);
    throw error;
  }
};

// Scrape movie URLs from the main listing pages
const scrapeMovieUrls = async (pageLimit = 3) => {
  try {
    const movieUrls = [];
    
    // Scrape multiple pages
    for (let page = 1; page <= pageLimit; page++) {
      const url = page === 1 ? BASE_URL : `${BASE_URL}/page/${page}/`;
      
      console.log(`Scraping movie URLs from page ${page}...`);
      
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      
      // Find article links which typically point to movie pages
      $('article h2.entry-title a').each((i, el) => {
        const movieUrl = $(el).attr('href');
        if (movieUrl) {
          movieUrls.push(movieUrl);
        }
      });
      
      // Sleep to avoid hitting the server too hard
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log(`Found ${movieUrls.length} movie URLs.`);
    return movieUrls;
  } catch (error) {
    console.error('Error scraping movie URLs:', error);
    throw error;
  }
};

// Main scraper function
const scrape = async (pageLimit = 2) => {
  try {
    console.log('Starting VegaMovies scraper...');
    
    // Get movie URLs
    const movieUrls = await scrapeMovieUrls(pageLimit);
    
    // Limit the number of movies for testing
    const limitedUrls = movieUrls.slice(0, 10); // Adjust as needed
    
    console.log(`Scraping details for ${limitedUrls.length} movies...`);
    
    const movies = [];
    
    // Scrape details for each movie
    for (let i = 0; i < limitedUrls.length; i++) {
      const url = limitedUrls[i];
      console.log(`Scraping movie ${i + 1}/${limitedUrls.length}: ${url}`);
      
      try {
        const movie = await scrapeMovieDetails(url);
        movies.push(movie);
        
        // Sleep between requests to be friendly to the server
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error(`Failed to scrape movie ${url}:`, error);
        // Continue with next movie
      }
    }
    
    console.log(`Successfully scraped ${movies.length} movies.`);
    return movies;
  } catch (error) {
    console.error('Error in main scraper function:', error);
    throw error;
  }
};

module.exports = {
  scrape
}; 