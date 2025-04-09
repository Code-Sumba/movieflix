import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchMoviesByCategory = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // In a real app, this would be an API call
        // const response = await fetch(`/api/movies/category/${categoryId}?page=${page}`);
        // const data = await response.json();
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data based on category
        const mockMovies = [];
        const totalMockMovies = 23; // Total count for pagination
        
        // Generate mock movies for this category
        for (let i = 1; i <= 8; i++) {
          const id = (page - 1) * 8 + i;
          if (id <= totalMockMovies) {
            mockMovies.push({
              id,
              title: `${categoryId} Movie ${id}`,
              posterUrl: '/placeholder.jpg',
              year: 2023 - Math.floor(Math.random() * 10),
              rating: (Math.random() * 2 + 7).toFixed(1),
              category: categoryId
            });
          }
        }
        
        setMovies(mockMovies);
        setTotalPages(Math.ceil(totalMockMovies / 8));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies by category:', error);
        setError('Failed to load movies. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchMoviesByCategory();
    // Scroll to top when category or page changes
    window.scrollTo(0, 0);
  }, [categoryId, page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  if (loading && page === 1) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 capitalize">{categoryId} Movies</h1>
        <div className="animate-pulse">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="bg-gray-300 h-64 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 capitalize">{categoryId} Movies</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 capitalize">{categoryId} Movies</h1>
      
      {movies.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No movies found in this category.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {movies.map(movie => (
              <div key={movie.id} className="movie-card">
                <Link to={`/movie/${movie.id}`}>
                  <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <img 
                      src={movie.posterUrl} 
                      alt={movie.title}
                      className="w-full h-64 object-cover"
                      onError={(e) => {
                        e.target.src = '/placeholder.jpg';
                      }}
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">{movie.title}</h3>
                      <div className="flex justify-between mt-2">
                        <span className="text-gray-600">{movie.year}</span>
                        <span className="text-yellow-500">★ {movie.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <nav className="flex items-center">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className={`mx-1 px-3 py-1 rounded ${
                    page === 1
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Previous
                </button>
                
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`mx-1 px-3 py-1 rounded ${
                      page === index + 1
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className={`mx-1 px-3 py-1 rounded ${
                    page === totalPages
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CategoryPage; 