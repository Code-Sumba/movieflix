import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Components
import HeroCarousel from '../components/HeroCarousel';
import MovieCard from '../components/MovieCard';
import { FiChevronRight, FiLoader } from 'react-icons/fi';

const Home = () => {
  // State for different movie sections
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        
        // Create API endpoint URLs
        const API_BASE_URL = 'http://localhost:5000/api';
        const featuredUrl = `${API_BASE_URL}/movies/featured`;
        const trendingUrl = `${API_BASE_URL}/movies/trending`;
        const latestUrl = `${API_BASE_URL}/movies/latest`;
        const categoriesUrl = `${API_BASE_URL}/movies/categories`;
        
        // Fetch all data in parallel
        const [featuredRes, trendingRes, latestRes, categoriesRes] = await Promise.all([
          axios.get(featuredUrl),
          axios.get(trendingUrl),
          axios.get(latestUrl),
          axios.get(categoriesUrl)
        ]);
        
        // Update state with fetched data
        if (featuredRes.data.success) setFeaturedMovies(featuredRes.data.movies);
        if (trendingRes.data.success) setTrendingMovies(trendingRes.data.movies);
        if (latestRes.data.success) setLatestMovies(latestRes.data.movies);
        if (categoriesRes.data.success) {
          setCategories(categoriesRes.data.categories);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching home data:', err);
        setError('Failed to load movies. Please try again later.');
        setLoading(false);
        
        // Set sample data for demonstration if API fails
        setSampleData();
      }
    };
    
    fetchHomeData();
  }, []);
  
  // Fallback sample data for demonstration
  const setSampleData = () => {
    // Sample featured movies
    setFeaturedMovies([
      {
        title: 'The Dark Knight',
        slug: 'the-dark-knight',
        description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
        poster: 'https://via.placeholder.com/300x450?text=Dark+Knight',
        backdrop: 'https://via.placeholder.com/1920x1080?text=Dark+Knight+Backdrop',
        releaseDate: '2008-07-18',
        rating: 9.0,
        genres: ['Action', 'Crime', 'Drama'],
        language: 'English'
      },
      {
        title: 'Inception',
        slug: 'inception',
        description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
        poster: 'https://via.placeholder.com/300x450?text=Inception',
        backdrop: 'https://via.placeholder.com/1920x1080?text=Inception+Backdrop',
        releaseDate: '2010-07-16',
        rating: 8.8,
        genres: ['Action', 'Adventure', 'Sci-Fi'],
        language: 'English'
      }
    ]);
    
    // Sample trending movies
    setTrendingMovies([
      {
        title: 'Dune',
        slug: 'dune',
        poster: 'https://via.placeholder.com/300x450?text=Dune',
        releaseDate: '2021-10-22',
        rating: 8.1,
        genres: ['Action', 'Adventure', 'Drama'],
        language: 'English'
      },
      {
        title: 'No Time to Die',
        slug: 'no-time-to-die',
        poster: 'https://via.placeholder.com/300x450?text=No+Time+To+Die',
        releaseDate: '2021-10-08',
        rating: 7.4,
        genres: ['Action', 'Adventure', 'Thriller'],
        language: 'English'
      },
      {
        title: 'Shang-Chi',
        slug: 'shang-chi',
        poster: 'https://via.placeholder.com/300x450?text=Shang+Chi',
        releaseDate: '2021-09-03',
        rating: 7.5,
        genres: ['Action', 'Adventure', 'Fantasy'],
        language: 'English'
      },
      {
        title: 'The French Dispatch',
        slug: 'the-french-dispatch',
        poster: 'https://via.placeholder.com/300x450?text=French+Dispatch',
        releaseDate: '2021-10-22',
        rating: 7.3,
        genres: ['Comedy', 'Drama', 'Romance'],
        language: 'English'
      }
    ]);
    
    // Sample latest movies
    setLatestMovies([
      {
        title: 'Eternals',
        slug: 'eternals',
        poster: 'https://via.placeholder.com/300x450?text=Eternals',
        releaseDate: '2021-11-05',
        rating: 6.8,
        genres: ['Action', 'Adventure', 'Fantasy'],
        language: 'English'
      },
      {
        title: 'Venom: Let There Be Carnage',
        slug: 'venom-let-there-be-carnage',
        poster: 'https://via.placeholder.com/300x450?text=Venom',
        releaseDate: '2021-10-01',
        rating: 6.3,
        genres: ['Action', 'Adventure', 'Sci-Fi'],
        language: 'English'
      },
      {
        title: 'Spencer',
        slug: 'spencer',
        poster: 'https://via.placeholder.com/300x450?text=Spencer',
        releaseDate: '2021-11-05',
        rating: 6.9,
        genres: ['Biography', 'Drama'],
        language: 'English'
      },
      {
        title: 'Last Night in Soho',
        slug: 'last-night-in-soho',
        poster: 'https://via.placeholder.com/300x450?text=Soho',
        releaseDate: '2021-10-29',
        rating: 7.2,
        genres: ['Drama', 'Horror', 'Mystery'],
        language: 'English'
      }
    ]);
    
    // Sample categories
    setCategories(['Hindi', 'English', 'South', 'Dubbed', 'Web Series']);
  };
  
  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FiLoader className="animate-spin h-8 w-8 text-primary-600" />
        <span className="ml-2 text-xl">Loading amazing movies...</span>
      </div>
    );
  }
  
  // Error state
  if (error && !featuredMovies.length && !trendingMovies.length && !latestMovies.length) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong</h2>
        <p className="mb-6">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="btn btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="pt-16"> {/* pt-16 to account for fixed navbar */}
      {/* Hero carousel */}
      <HeroCarousel featuredMovies={featuredMovies} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Trending Movies Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Trending Movies
            </h2>
            <Link to="/trending" className="text-primary-600 dark:text-primary-400 flex items-center hover:underline">
              View All <FiChevronRight className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {trendingMovies.slice(0, 6).map((movie) => (
              <MovieCard key={movie.slug} movie={movie} />
            ))}
          </div>
        </section>
        
        {/* Latest Movies Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Latest Releases
            </h2>
            <Link to="/latest" className="text-primary-600 dark:text-primary-400 flex items-center hover:underline">
              View All <FiChevronRight className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {latestMovies.slice(0, 6).map((movie) => (
              <MovieCard key={movie.slug} movie={movie} />
            ))}
          </div>
        </section>
        
        {/* Categories Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Browse by Category
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link 
                key={category}
                to={`/category/${category}`}
                className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-md rounded-lg p-6 text-center transition-colors hover:text-primary-600"
              >
                <h3 className="font-medium text-lg">{category}</h3>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home; 