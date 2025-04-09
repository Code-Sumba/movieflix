import React, { useState } from 'react';

const AdminAddMovie = () => {
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
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      // In a real app, this would be an API call
      // const response = await fetch('/api/admin/movies', {
      //   method: 'POST',
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
        text: `Movie "${movie.title}" has been added successfully!`
      });
      
      // Reset form
      setMovie({
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
    } catch (error) {
      console.error('Error adding movie:', error);
      setMessage({
        type: 'danger',
        text: 'Failed to add movie. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add New Movie</h2>
      
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
        
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Movie'}
        </button>
      </form>
    </div>
  );
};

export default AdminAddMovie; 