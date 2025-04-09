import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiPlay, FiDownload, FiInfo, FiStar } from 'react-icons/fi';

const HeroCarousel = ({ featuredMovies = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // Auto-advance slides every 5 seconds
  useEffect(() => {
    let interval;
    
    if (isAutoPlaying && featuredMovies.length > 0) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === featuredMovies.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying, featuredMovies.length]);
  
  // Pause auto-play when user interacts with carousel
  const handleManualChange = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 10000);
  };
  
  const goToPrevious = () => {
    const newIndex = currentIndex === 0 
      ? featuredMovies.length - 1 
      : currentIndex - 1;
    handleManualChange(newIndex);
  };
  
  const goToNext = () => {
    const newIndex = currentIndex === featuredMovies.length - 1 
      ? 0 
      : currentIndex + 1;
    handleManualChange(newIndex);
  };
  
  // If no featured movies are available, show placeholder
  if (!featuredMovies || featuredMovies.length === 0) {
    return (
      <div className="relative bg-gray-900 h-[500px] flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Featured Movies Coming Soon</h2>
          <p className="text-gray-300">Check back later for our featured selection</p>
        </div>
      </div>
    );
  }
  
  const currentMovie = featuredMovies[currentIndex];
  
  return (
    <div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={currentMovie.backdrop || currentMovie.poster}
          alt={currentMovie.title}
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16">
        <div className="max-w-3xl mb-12">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {currentMovie.title}
          </h1>
          
          {/* Meta info */}
          <div className="flex flex-wrap items-center space-x-4 mb-4 text-gray-300">
            {currentMovie.rating > 0 && (
              <div className="flex items-center">
                <FiStar className="mr-1 text-yellow-400" />
                <span>{currentMovie.rating.toFixed(1)}</span>
              </div>
            )}
            
            <span>{new Date(currentMovie.releaseDate).getFullYear()}</span>
            
            {currentMovie.language && (
              <span className="px-2 py-1 bg-primary-600/80 rounded text-white text-sm">
                {currentMovie.language}
              </span>
            )}
            
            {currentMovie.genres && currentMovie.genres.slice(0, 3).map(genre => (
              <span key={genre} className="text-sm">
                {genre}
              </span>
            ))}
          </div>
          
          {/* Description */}
          <p className="text-white/80 text-lg mb-8 line-clamp-3">
            {currentMovie.description}
          </p>
          
          {/* Action buttons */}
          <div className="flex flex-wrap gap-4">
            {currentMovie.trailerUrl && (
              <a
                href={currentMovie.trailerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary flex items-center"
              >
                <FiPlay className="mr-2" />
                Watch Trailer
              </a>
            )}
            
            <Link
              to={`/movie/${currentMovie.slug}`}
              className="btn btn-secondary flex items-center"
            >
              <FiInfo className="mr-2" />
              More Info
            </Link>
            
            <Link
              to={`/movie/${currentMovie.slug}#download`}
              className="btn btn-primary flex items-center"
            >
              <FiDownload className="mr-2" />
              Download
            </Link>
          </div>
        </div>
      </div>
      
      {/* Navigation arrows */}
      <button 
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
        aria-label="Previous movie"
      >
        <FiChevronLeft className="h-6 w-6" />
      </button>
      
      <button 
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
        aria-label="Next movie"
      >
        <FiChevronRight className="h-6 w-6" />
      </button>
      
      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {featuredMovies.map((_, index) => (
          <button
            key={index}
            onClick={() => handleManualChange(index)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel; 