import axios from 'axios';
import { getToken } from './auth';

// Base API URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor to add auth token to all requests
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Generic error handler
const handleApiError = (error) => {
  let errorMessage = 'An unknown error occurred';
  
  if (error.response) {
    // The server responded with a status code outside the 2xx range
    const { status, data } = error.response;
    
    if (data && data.message) {
      errorMessage = data.message;
    } else if (status === 401) {
      errorMessage = 'Unauthorized access. Please log in again.';
    } else if (status === 403) {
      errorMessage = 'You do not have permission to perform this action.';
    } else if (status === 404) {
      errorMessage = 'The requested resource was not found.';
    } else if (status === 500) {
      errorMessage = 'Server error. Please try again later.';
    }
  } else if (error.request) {
    // The request was made but no response was received
    errorMessage = 'No response from server. Please check your internet connection.';
  } else {
    // Something happened in setting up the request
    errorMessage = error.message || errorMessage;
  }
  
  return {
    error: true,
    message: errorMessage,
    originalError: error
  };
};

// Get request with error handling
export const get = async (url, params = {}) => {
  try {
    const response = await api.get(url, { params });
    return {
      data: response.data,
      error: false
    };
  } catch (error) {
    return handleApiError(error);
  }
};

// Post request with error handling
export const post = async (url, data = {}, config = {}) => {
  try {
    const response = await api.post(url, data, config);
    return {
      data: response.data,
      error: false
    };
  } catch (error) {
    return handleApiError(error);
  }
};

// Put request with error handling
export const put = async (url, data = {}) => {
  try {
    const response = await api.put(url, data);
    return {
      data: response.data,
      error: false
    };
  } catch (error) {
    return handleApiError(error);
  }
};

// Patch request with error handling
export const patch = async (url, data = {}) => {
  try {
    const response = await api.patch(url, data);
    return {
      data: response.data,
      error: false
    };
  } catch (error) {
    return handleApiError(error);
  }
};

// Delete request with error handling
export const del = async (url, data = {}) => {
  try {
    const response = await api.delete(url, { data });
    return {
      data: response.data,
      error: false
    };
  } catch (error) {
    return handleApiError(error);
  }
};

// Upload file with progress tracking
export const uploadFile = async (url, file, onProgress) => {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await api.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        }
      },
    });
    
    return {
      data: response.data,
      error: false
    };
  } catch (error) {
    return handleApiError(error);
  }
};

// Cancel request token generator
export const getCancelToken = () => {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  return source;
};

// Create request with cancelation
export const createCancelableRequest = (requestFn) => {
  const source = getCancelToken();
  
  const request = async (...args) => {
    try {
      const response = await requestFn(...args, {
        cancelToken: source.token
      });
      return response;
    } catch (error) {
      if (axios.isCancel(error)) {
        return { error: true, message: 'Request was canceled', canceled: true };
      }
      return handleApiError(error);
    }
  };
  
  return {
    request,
    cancel: (message = 'Operation canceled by the user') => source.cancel(message)
  };
};

// API endpoints for movies
export const movieApi = {
  // Get all movies with pagination and filters
  getMovies: async (page = 1, limit = 20, filters = {}) => {
    try {
      const queryParams = new URLSearchParams({
        page,
        limit,
        ...filters
      });
      
      const response = await api.get(`/movies?${queryParams}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  },
  
  // Get featured movies for homepage carousel
  getFeatured: async () => {
    try {
      const response = await api.get('/movies/featured');
      return response.data;
    } catch (error) {
      console.error('Error fetching featured movies:', error);
      throw error;
    }
  },
  
  // Get trending movies
  getTrending: async () => {
    try {
      const response = await api.get('/movies/trending');
      return response.data;
    } catch (error) {
      console.error('Error fetching trending movies:', error);
      throw error;
    }
  },
  
  // Get latest movies
  getLatest: async () => {
    try {
      const response = await api.get('/movies/latest');
      return response.data;
    } catch (error) {
      console.error('Error fetching latest movies:', error);
      throw error;
    }
  },
  
  // Get categories and genres
  getCategories: async () => {
    try {
      const response = await api.get('/movies/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },
  
  // Get movies by category with pagination
  getByCategory: async (category, page = 1, limit = 20) => {
    try {
      const queryParams = new URLSearchParams({ page, limit });
      const response = await api.get(`/movies/category/${category}?${queryParams}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${category} movies:`, error);
      throw error;
    }
  },
  
  // Get single movie by slug
  getMovie: async (slug) => {
    try {
      const response = await api.get(`/movies/movie/${slug}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  },
  
  // Search movies with filters
  search: async (query, filters = {}, page = 1, limit = 20) => {
    try {
      const queryParams = new URLSearchParams({ page, limit });
      const response = await api.post(`/movies/search?${queryParams}`, {
        query,
        filters
      });
      return response.data;
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  },
  
  // Track download
  trackDownload: async (movieId) => {
    try {
      const response = await api.put(`/movies/download/${movieId}`);
      return response.data;
    } catch (error) {
      console.error('Error tracking download:', error);
      throw error;
    }
  }
};

// API endpoints for admin
export const adminApi = {
  // Get dashboard stats
  getStats: async () => {
    try {
      const response = await api.get('/admin/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching admin stats:', error);
      throw error;
    }
  },
  
  // Get all movies for admin with pagination and search
  getMovies: async (page = 1, limit = 15, search = '') => {
    try {
      const queryParams = new URLSearchParams({
        page,
        limit,
        search
      });
      
      const response = await api.get(`/admin/movies?${queryParams}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movies for admin:', error);
      throw error;
    }
  },
  
  // Get single movie for editing
  getMovie: async (id) => {
    try {
      const response = await api.get(`/admin/movies/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movie for admin:', error);
      throw error;
    }
  },
  
  // Create new movie
  createMovie: async (movieData) => {
    try {
      const response = await api.post('/admin/movies', movieData);
      return response.data;
    } catch (error) {
      console.error('Error creating movie:', error);
      throw error;
    }
  },
  
  // Update existing movie
  updateMovie: async (id, movieData) => {
    try {
      const response = await api.put(`/admin/movies/${id}`, movieData);
      return response.data;
    } catch (error) {
      console.error('Error updating movie:', error);
      throw error;
    }
  },
  
  // Delete movie
  deleteMovie: async (id) => {
    try {
      const response = await api.delete(`/admin/movies/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting movie:', error);
      throw error;
    }
  },
  
  // Get logs with pagination and filtering
  getLogs: async (page = 1, limit = 50, filters = {}) => {
    try {
      const queryParams = new URLSearchParams({
        page,
        limit,
        ...filters
      });
      
      const response = await api.get(`/admin/logs?${queryParams}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching logs:', error);
      throw error;
    }
  },
  
  // Get scraper sources information
  getScraperSources: async () => {
    try {
      const response = await api.get('/admin/scraper/sources');
      return response.data;
    } catch (error) {
      console.error('Error fetching scraper sources:', error);
      throw error;
    }
  },
  
  // Run scraper manually
  runScraper: async (source) => {
    try {
      const response = await api.post('/admin/scraper/run', { source });
      return response.data;
    } catch (error) {
      console.error('Error running scraper:', error);
      throw error;
    }
  }
};

export default {
  get,
  post,
  put,
  patch,
  del,
  uploadFile,
  getCancelToken,
  createCancelableRequest,
  api
}; 