import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/admin/movies', {
        //   headers: {
        //     'Authorization': `Bearer ${token}`
        //   }
        // });
        // const data = await response.json();
        
        // Placeholder data
        const placeholderMovies = [
          { id: 1, title: 'The Shawshank Redemption', year: 1994, poster: '/placeholder.jpg', status: 'active' },
          { id: 2, title: 'The Godfather', year: 1972, poster: '/placeholder.jpg', status: 'active' },
          { id: 3, title: 'The Dark Knight', year: 2008, poster: '/placeholder.jpg', status: 'active' },
          { id: 4, title: 'The Godfather Part II', year: 1974, poster: '/placeholder.jpg', status: 'inactive' },
          { id: 5, title: 'Pulp Fiction', year: 1994, poster: '/placeholder.jpg', status: 'active' },
        ];
        
        setTimeout(() => {
          setMovies(placeholderMovies);
          setLoading(false);
        }, 500);
        
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Failed to load movies. Please try again.');
        setLoading(false);
      }
    };
    
    fetchMovies();
  }, []);
  
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowConfirmDialog(true);
  };
  
  const confirmDelete = async () => {
    try {
      // In a real app, this would be an API call
      // await fetch(`/api/admin/movies/${deleteId}`, {
      //   method: 'DELETE',
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update UI
      setMovies(prevMovies => prevMovies.filter(movie => movie.id !== deleteId));
      
    } catch (error) {
      console.error('Error deleting movie:', error);
      setError('Failed to delete movie. Please try again.');
    } finally {
      setShowConfirmDialog(false);
      setDeleteId(null);
    }
  };
  
  const cancelDelete = () => {
    setShowConfirmDialog(false);
    setDeleteId(null);
  };
  
  if (loading) {
    return (
      <div className="container mt-5">
        <h2>Loading movies...</h2>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Movies</h2>
        <Link to="/admin/movies/add" className="btn btn-primary">
          Add New Movie
        </Link>
      </div>
      
      {movies.length === 0 ? (
        <p>No movies found. Add some movies to get started.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Poster</th>
                <th>Title</th>
                <th>Year</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie.id}>
                  <td>{movie.id}</td>
                  <td>
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      style={{ width: '50px', height: '70px', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.src = '/placeholder.jpg';
                      }}
                    />
                  </td>
                  <td>{movie.title}</td>
                  <td>{movie.year}</td>
                  <td>
                    <span className={`badge ${movie.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
                      {movie.status}
                    </span>
                  </td>
                  <td>
                    <div className="btn-group" role="group">
                      <Link to={`/admin/movies/edit/${movie.id}`} className="btn btn-sm btn-primary">
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(movie.id)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="btn-close" onClick={cancelDelete}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this movie? This action cannot be undone.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={cancelDelete}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={confirmDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMovies; 