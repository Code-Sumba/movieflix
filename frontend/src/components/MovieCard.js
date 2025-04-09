import React from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiClock, FiCalendar, FiVideo } from 'react-icons/fi';

const MovieCard = ({ movie }) => {
  // Format the release date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  // Ensure we have the movie object
  if (!movie) {
    return null;
  }

  return (
    <Link 
      to={`/movie/${movie.slug}`}
      className="card group hover:shadow-lg transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative overflow-hidden aspect-[2/3]">
        {/* Movie poster */}
        <img 
          src={movie.poster || 'https://via.placeholder.com/300x450?text=No+Poster'} 
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Overlay with additional info */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          {/* Movie title */}
          <h3 className="text-white font-bold text-lg line-clamp-2">{movie.title}</h3>
          
          {/* Movie metadata - rating, year, language */}
          <div className="flex items-center space-x-3 mt-2 text-xs text-white/90">
            {movie.rating > 0 && (
              <div className="flex items-center">
                <FiStar className="mr-1 text-yellow-400" />
                <span>{movie.rating.toFixed(1)}</span>
              </div>
            )}
            
            <div className="flex items-center">
              <FiCalendar className="mr-1" />
              <span>{new Date(movie.releaseDate).getFullYear()}</span>
            </div>
            
            {movie.language && (
              <div className="px-1.5 py-0.5 bg-primary-600/80 rounded text-white text-xs">
                {movie.language}
              </div>
            )}
            
            {movie.isSeries && (
              <div className="flex items-center">
                <FiVideo className="mr-1" />
                <span>Series</span>
              </div>
            )}
          </div>
          
          {/* Genres */}
          {movie.genres && movie.genres.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {movie.genres.slice(0, 2).map((genre) => (
                <span 
                  key={genre} 
                  className="text-xs px-1.5 py-0.5 bg-gray-800/70 text-white/90 rounded"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {/* Quality tag - for latest movies or featured */}
        {movie.isFeatured && (
          <div className="absolute top-2 left-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded">
            Featured
          </div>
        )}
        
        {movie.isTrending && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            Trending
          </div>
        )}
      </div>
      
      {/* Card bottom info (visible always) */}
      <div className="p-3 bg-white dark:bg-gray-800">
        <h3 className="font-medium text-gray-900 dark:text-white line-clamp-1">
          {movie.title}
        </h3>
        
        <div className="flex items-center justify-between mt-1 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center">
            <FiCalendar className="mr-1" />
            <span>{formatDate(movie.releaseDate)}</span>
          </div>
          
          {movie.rating > 0 && (
            <div className="flex items-center">
              <FiStar className="mr-1 text-yellow-500" />
              <span>{movie.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default MovieCard; 