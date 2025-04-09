import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import YouTube from 'react-youtube';
import { 
  FiStar, FiCalendar, FiClock, FiDownload, 
  FiPlayCircle, FiGlobe, FiLoader, FiAlertCircle,
  FiChevronDown, FiChevronUp, FiVideo, FiFlag
} from 'react-icons/fi';

const MovieDetail = () => {
  const { id: slug } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('downloads');
  const [showAllDescription, setShowAllDescription] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState(false);
  
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        
        const API_BASE_URL = 'http://localhost:5000/api';
        const response = await axios.get(`${API_BASE_URL}/movies/movie/${slug}`);
        
        if (response.data.success) {
          setMovie(response.data.movie);
        } else {
          setError('Failed to load movie details.');
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError('Failed to load movie details. Please try again later.');
        setLoading(false);
        
        // Set sample data for demonstration if API fails
        setSampleMovie();
      }
    };
    
    fetchMovieDetails();
    
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Scroll to download section if URL has #download hash
    if (window.location.hash === '#download') {
      setTimeout(() => {
        const downloadSection = document.getElementById('download-section');
        if (downloadSection) {
          downloadSection.scrollIntoView({ behavior: 'smooth' });
          setActiveTab('downloads');
        }
      }, 1000);
    }
  }, [slug]);
  
  // Fallback sample data for demonstration
  const setSampleMovie = () => {
    setMovie({
      title: 'Dune (2021)',
      slug: 'dune-2021',
      description: `Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people. As malevolent forces explode into conflict over the planet's exclusive supply of the most precious resource in existence, only those who can conquer their own fear will survive.`,
      poster: 'https://via.placeholder.com/500x750?text=Dune+Poster',
      backdrop: 'https://via.placeholder.com/1920x1080?text=Dune+Backdrop',
      releaseDate: '2021-10-22',
      duration: 155,
      rating: 8.1,
      genres: ['Action', 'Adventure', 'Drama', 'Sci-Fi'],
      language: 'English',
      subtitles: ['English', 'Hindi', 'Spanish'],
      trailerUrl: 'https://www.youtube.com/watch?v=8g18jFHCLXk',
      downloadLinks: [
        {
          quality: '720p',
          size: '1.2 GB',
          provider: 'Direct Link',
          url: '#'
        },
        {
          quality: '1080p',
          size: '2.5 GB',
          provider: 'Direct Link',
          url: '#'
        },
        {
          quality: '480p',
          size: '700 MB',
          provider: 'Direct Link',
          url: '#'
        }
      ],
      categories: ['English', 'Hollywood'],
      isSeries: false
    });
  };
  
  // Function to track download
  const handleDownload = async (movieId, url) => {
    try {
      // Track download count
      const API_BASE_URL = 'http://localhost:5000/api';
      await axios.put(`${API_BASE_URL}/movies/download/${movieId}`);
      
      // Mark as started (to show the thank you message)
      setDownloadStarted(true);
      
      // You can optionally redirect to the download URL here
      window.open(url, '_blank');
      
      // Reset the state after a few seconds
      setTimeout(() => {
        setDownloadStarted(false);
      }, 5000);
    } catch (error) {
      console.error('Error tracking download:', error);
      // Still open the download link even if tracking fails
      window.open(url, '_blank');
    }
  };
  
  // YouTube video options
  const youtubeOpts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  };
  
  // Extract YouTube video ID from URL
  const getYoutubeId = (url) => {
    if (!url) return null;
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    return (match && match[2].length === 11)
      ? match[2]
      : null;
  };
  
  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FiLoader className="animate-spin h-8 w-8 text-primary-600" />
        <span className="ml-2 text-xl">Loading movie details...</span>
      </div>
    );
  }
  
  // Error state
  if (error || !movie) {
    return (
      <div className="text-center py-20">
        <FiAlertCircle className="mx-auto h-12 w-12 text-red-600" />
        <h2 className="text-2xl font-bold text-red-600 mb-4">Movie Not Found</h2>
        <p className="mb-6">{error || "We couldn't find the movie you're looking for."}</p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }
  
  // Format release date
  const formatReleaseDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };
  
  // Format duration to hours and minutes
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  // Get YouTube video ID
  const youtubeVideoId = getYoutubeId(movie.trailerUrl);
  
  return (
    <div className="pt-16">
      {/* Movie backdrop and basic info */}
      <div className="relative">
        {/* Backdrop image */}
        <div className="w-full h-[50vh] md:h-[60vh]">
          <img
            src={movie.backdrop || movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
        </div>
        
        {/* Movie info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
            {/* Poster (mobile: hidden, desktop: visible) */}
            <div className="hidden md:block md:w-1/4 lg:w-1/5 flex-shrink-0 -mt-32 z-10">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full rounded-lg shadow-xl"
              />
            </div>
            
            {/* Movie details */}
            <div className="md:ml-8 md:w-3/4 lg:w-4/5">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{movie.title}</h1>
              
              {/* Meta info row */}
              <div className="flex flex-wrap items-center text-sm md:text-base space-x-4 mb-4">
                {movie.rating > 0 && (
                  <div className="flex items-center">
                    <FiStar className="mr-1 text-yellow-400" />
                    <span>{movie.rating.toFixed(1)}</span>
                  </div>
                )}
                
                <div className="flex items-center">
                  <FiCalendar className="mr-1" />
                  <span>{formatReleaseDate(movie.releaseDate)}</span>
                </div>
                
                {movie.duration && (
                  <div className="flex items-center">
                    <FiClock className="mr-1" />
                    <span>{formatDuration(movie.duration)}</span>
                  </div>
                )}
                
                {movie.language && (
                  <div className="flex items-center">
                    <FiGlobe className="mr-1" />
                    <span>{movie.language}</span>
                  </div>
                )}
                
                {movie.isSeries && (
                  <div className="flex items-center">
                    <FiVideo className="mr-1" />
                    <span>Web Series</span>
                  </div>
                )}
              </div>
              
              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genres && movie.genres.map((genre) => (
                  <span 
                    key={genre} 
                    className="px-3 py-1 bg-gray-800/80 rounded-full text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              
              {/* Description preview */}
              <div className="mb-4">
                <p className={`text-gray-300 ${showAllDescription ? '' : 'line-clamp-3'}`}>
                  {movie.description}
                </p>
                {movie.description && movie.description.length > 150 && (
                  <button 
                    onClick={() => setShowAllDescription(!showAllDescription)}
                    className="text-primary-400 mt-1 flex items-center text-sm"
                  >
                    {showAllDescription ? (
                      <>Show Less <FiChevronUp className="ml-1" /></>
                    ) : (
                      <>Read More <FiChevronDown className="ml-1" /></>
                    )}
                  </button>
                )}
              </div>
              
              {/* Action buttons */}
              <div className="flex flex-wrap gap-3">
                {youtubeVideoId && (
                  <a 
                    href="#trailer-section"
                    className="btn btn-primary flex items-center"
                  >
                    <FiPlayCircle className="mr-2" />
                    Watch Trailer
                  </a>
                )}
                
                <a 
                  href="#download-section"
                  className="btn btn-secondary flex items-center"
                >
                  <FiDownload className="mr-2" />
                  Download Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Poster for mobile (shown at the top of content) */}
      <div className="md:hidden -mt-20 px-4 mb-6">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-48 mx-auto rounded-lg shadow-xl"
        />
      </div>
      
      {/* Main content area */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left column (2/3 width) */}
          <div className="md:col-span-2">
            {/* Trailer section */}
            {youtubeVideoId && (
              <section id="trailer-section" className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  Official Trailer
                </h2>
                <div className="aspect-video rounded-lg overflow-hidden bg-gray-900">
                  <YouTube 
                    videoId={youtubeVideoId} 
                    opts={youtubeOpts} 
                    className="w-full h-full"
                  />
                </div>
              </section>
            )}
            
            {/* Download section */}
            <section id="download-section" className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Download Links
              </h2>
              
              {/* Download links */}
              {downloadStarted ? (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-6 rounded-lg text-center mb-6">
                  <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-2">
                    Thank You for Downloading!
                  </h3>
                  <p className="text-green-600 dark:text-green-300 mb-4">
                    Your download should start automatically. If it doesn't, please click the download link again.
                  </p>
                </div>
              ) : (
                <>
                  {movie.downloadLinks && movie.downloadLinks.length > 0 ? (
                    <div className="space-y-3">
                      {movie.downloadLinks.sort((a, b) => {
                        // Sort by quality (1080p first, then 720p, etc.)
                        const qualityOrder = { '2160p': 1, '1080p': 2, '720p': 3, '480p': 4, 'Other': 5 };
                        return qualityOrder[a.quality] - qualityOrder[b.quality];
                      }).map((link, index) => (
                        <div 
                          key={index} 
                          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-wrap items-center justify-between"
                        >
                          <div className="flex items-center mb-2 md:mb-0">
                            <div className="w-20 px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-center font-medium mr-4">
                              {link.quality}
                            </div>
                            <div>
                              <div className="font-medium">{link.provider}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">{link.size}</div>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDownload(movie._id, link.url)}
                            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-200"
                          >
                            <FiDownload className="mr-2" />
                            Download
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-6 rounded-lg text-center">
                      <p className="text-yellow-700 dark:text-yellow-400">
                        Download links will be available soon. Please check back later.
                      </p>
                    </div>
                  )}
                  
                  {/* Download instructions */}
                  <div className="mt-6 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Download Instructions:</h3>
                    <ol className="list-decimal list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Click on the download button for your preferred quality.</li>
                      <li>You may be redirected to the provider's site.</li>
                      <li>If presented with multiple links, choose the one that works best for you.</li>
                      <li>For any issues, please report the broken link using the report button.</li>
                    </ol>
                  </div>
                </>
              )}
              
              {/* Report broken links */}
              <div className="mt-4 text-center">
                <button className="text-red-500 dark:text-red-400 inline-flex items-center text-sm">
                  <FiFlag className="mr-1" /> Report Broken Link
                </button>
              </div>
            </section>
          </div>
          
          {/* Right column (1/3 width) */}
          <div>
            {/* Movie details card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Movie Details
              </h3>
              
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Title:</span>
                  <span className="font-medium">{movie.title}</span>
                </li>
                
                <li className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Release Date:</span>
                  <span>{formatReleaseDate(movie.releaseDate)}</span>
                </li>
                
                {movie.duration && (
                  <li className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                    <span>{formatDuration(movie.duration)}</span>
                  </li>
                )}
                
                <li className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Language:</span>
                  <span>{movie.language}</span>
                </li>
                
                {movie.subtitles && movie.subtitles.length > 0 && (
                  <li className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Subtitles:</span>
                    <span>{movie.subtitles.join(', ')}</span>
                  </li>
                )}
                
                {movie.isSeries && (
                  <>
                    <li className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Type:</span>
                      <span>Web Series</span>
                    </li>
                    
                    {movie.totalSeasons > 0 && (
                      <li className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Seasons:</span>
                        <span>{movie.totalSeasons}</span>
                      </li>
                    )}
                    
                    {movie.totalEpisodes > 0 && (
                      <li className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Episodes:</span>
                        <span>{movie.totalEpisodes}</span>
                      </li>
                    )}
                  </>
                )}
                
                {movie.rating > 0 && (
                  <li className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Rating:</span>
                    <span className="flex items-center">
                      <FiStar className="mr-1 text-yellow-500" />
                      {movie.rating.toFixed(1)}/10
                    </span>
                  </li>
                )}
              </ul>
            </div>
            
            {/* Categories and Tags */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Categories
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {movie.categories && movie.categories.map((category) => (
                  <Link 
                    key={category}
                    to={`/category/${category}`}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors"
                  >
                    {category}
                  </Link>
                ))}
                
                {movie.genres && movie.genres.map((genre) => (
                  <Link 
                    key={genre}
                    to={`/search?genre=${genre}`}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors"
                  >
                    {genre}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail; 