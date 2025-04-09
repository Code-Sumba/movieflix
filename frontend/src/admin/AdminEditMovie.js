import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AdminEditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    releaseYear: '',
    duration: '',
    genre: '',
    director: '',
    cast: '',
    posterUrl: '',
    trailerUrl: '',
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        // const response = await fetch(`/api/admin/movies/${id}`, {
        //   headers: {
        //     'Authorization': `Bearer ${token}`
        //   }
        // });
        // const data = await response.json();
        
        // Placeholder data
        const movieData = {
          id: parseInt(id),
          title: 'Sample Movie',
          description: 'This is a sample movie description. It tells the story of a fictional character in a fictional world.',
          releaseYear: 2022,
          duration: 120,
          genre: 'Drama, Action',
          director: 'Jane Director',
          cast: 'Actor One, Actor Two, Actor Three',
          posterUrl: 'https://via.placeholder.com/300x450',
          trailerUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        };
        
        setTimeout(() => {
          setMovie(movieData);
          setLoading(false);
        }, 500);
        
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setError('Failed to load movie details. Please try again.');
        setLoading(false);
      }
    };
    
    fetchMovie();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });
    
    try {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/admin/movies/${id}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify(movie)
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate success
      setMessage({
        type: 'success',
        text: `Movie "${movie.title}" has been updated successfully!`
      });
      
    } catch (error) {
      console.error('Error updating movie:', error);
      setMessage({
        type: 'danger',
        text: 'Failed to update movie. Please try again.'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/movies');
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <h2>Loading movie details...</h2>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">
          {error}
        </div>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/admin/movies')}
        >
          Back to Movies
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Edit Movie: {movie.title}</h2>
      
      {message.text && (
        <div className={`alert alert-${message.type}`}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={movie.title}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={movie.description}
            onChange={handleChange}
            rows="3"
            required
          />
        </div>
        
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="releaseYear" className="form-label">Release Year</label>
            <input
              type="number"
              className="form-control"
              id="releaseYear"
              name="releaseYear"
              value={movie.releaseYear}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="col-md-6 mb-3">
            <label htmlFor="duration" className="form-label">Duration (minutes)</label>
            <input
              type="number"
              className="form-control"
              id="duration"
              name="duration"
              value={movie.duration}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="mb-3">
          <label htmlFor="genre" className="form-label">Genre</label>
          <input
            type="text"
            className="form-control"
            id="genre"
            name="genre"
            value={movie.genre}
            onChange={handleChange}
            placeholder="Action, Drama, Comedy, etc."
            required
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="director" className="form-label">Director</label>
          <input
            type="text"
            className="form-control"
            id="director"
            name="director"
            value={movie.director}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="cast" className="form-label">Cast</label>
          <input
            type="text"
            className="form-control"
            id="cast"
            name="cast"
            value={movie.cast}
            onChange={handleChange}
            placeholder="Actor1, Actor2, Actor3, etc."
            required
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="posterUrl" className="form-label">Poster URL</label>
          <input
            type="url"
            className="form-control"
            id="posterUrl"
            name="posterUrl"
            value={movie.posterUrl}
            onChange={handleChange}
            required
          />
          {movie.posterUrl && (
            <div className="mt-2">
              <img
                src={movie.posterUrl}
                alt="Movie Poster Preview"
                style={{ height: '150px' }}
                onError={(e) => {
                  e.target.src = '/placeholder.jpg';
                }}
              />
            </div>
          )}
        </div>
        
        <div className="mb-3">
          <label htmlFor="trailerUrl" className="form-label">Trailer URL</label>
          <input
            type="url"
            className="form-control"
            id="trailerUrl"
            name="trailerUrl"
            value={movie.trailerUrl}
            onChange={handleChange}
          />
        </div>
        
        <div className="d-flex gap-2">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
            disabled={saving}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminEditMovie; 