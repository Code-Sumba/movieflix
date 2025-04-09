import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Search = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('q') || '';

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        // const response = await fetch(`/api/search?q=${searchQuery}`);
        // const data = await response.json();
        
        // Placeholder data
        const placeholderResults = [
          { id: 1, title: 'Sample Movie 1', year: 2023, poster: '/placeholder.jpg' },
          { id: 2, title: 'Sample Movie 2', year: 2022, poster: '/placeholder.jpg' },
          { id: 3, title: 'Sample Movie 3', year: 2021, poster: '/placeholder.jpg' },
        ];
        
        setTimeout(() => {
          setResults(placeholderResults);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchSearchResults();
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [searchQuery]);

  if (loading) {
    return (
      <div className="container mt-5">
        <h2>Searching for "{searchQuery}"...</h2>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Search Results for "{searchQuery}"</h2>
      {results.length === 0 ? (
        <p>No results found. Try another search term.</p>
      ) : (
        <div className="row">
          {results.map((movie) => (
            <div key={movie.id} className="col-md-4 mb-4">
              <div className="card">
                <img 
                  src={movie.poster} 
                  className="card-img-top" 
                  alt={movie.title}
                  onError={(e) => {
                    e.target.src = '/placeholder.jpg';
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <p className="card-text">{movie.year}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search; 