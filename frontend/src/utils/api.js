import axios from 'axios';
import { getToken } from './auth';

// Check if we're running on GitHub Pages
const isGitHubPages = window.location.hostname.includes('github.io');

// Set the base URL for API calls
const API_URL = isGitHubPages 
  ? '/movieflix' // GitHub Pages base path
  : 'http://localhost:5000/api'; // Local development API

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    
    // If running on GitHub Pages, modify the request
    if (isGitHubPages) {
      // Store the original URL for use in the response interceptor
      config.originalUrl = config.url;
      
      // Convert URL to mock data path
      // Transform URLs like "/movies/trending" to "/mock-data/movies/trending.json"
      if (config.url.startsWith('/')) {
        config.url = `/movieflix/mock-data${config.url}.json`;
      } else {
        config.url = `/movieflix/mock-data/${config.url}.json`;
      }
      
      console.log('GitHub Pages mode: Redirecting to mock data:', config.url);
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for GitHub Pages mock mode
api.interceptors.response.use(
  (response) => {
    if (isGitHubPages) {
      console.log('Mock data response:', response.data);
    }
    return response;
  },
  async (error) => {
    // If running on GitHub Pages and got an error, return mock data
    if (isGitHubPages) {
      console.warn('Error fetching mock data:', error.message);
      console.log('Attempting to provide fallback mock data...');
      
      const originalRequest = error.config;
      const originalUrl = originalRequest.originalUrl || '';
      
      // Default mock data for common endpoints
      if (originalUrl.includes('/admin/login')) {
        console.log('Providing mock login data');
        return {
          data: {
            success: true,
            token: 'mock-jwt-token-for-github-pages',
            user: { username: 'admin', isAdmin: true }
          }
        };
      }
      
      if (originalUrl.includes('/movies')) {
        console.log('Providing mock movies data');
        return {
          data: {
            success: true,
            movies: [
              {
                id: '1',
                title: 'The Shawshank Redemption',
                posterUrl: '/movieflix/images/placeholder.svg',
                year: 1994,
                category: 'Drama',
                rating: 9.3,
                description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'
              },
              {
                id: '2',
                title: 'The Godfather',
                posterUrl: '/movieflix/images/placeholder.svg',
                year: 1972,
                category: 'Crime',
                rating: 9.2,
                description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.'
              },
              {
                id: '3',
                title: 'The Dark Knight',
                posterUrl: '/movieflix/images/placeholder.svg',
                year: 2008,
                category: 'Action',
                rating: 9.0,
                description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.'
              }
            ],
            currentPage: 1,
            totalPages: 1,
            totalMovies: 3
          }
        };
      }
      
      if (originalUrl.includes('/categories')) {
        console.log('Providing mock categories data');
        return {
          data: {
            success: true,
            categories: ['Action', 'Comedy', 'Drama', 'VegaMovies', 'BollyFlix']
          }
        };
      }
      
      if (originalUrl.includes('/admin/stats')) {
        console.log('Providing mock admin stats data');
        return {
          data: {
            success: true,
            stats: {
              totalMovies: 100,
              totalUsers: 250,
              totalCategories: 8
            }
          }
        };
      }
      
      // Generic fallback for any other endpoint
      console.log('Providing generic mock data response');
      return {
        data: {
          success: true,
          message: 'This is fallback mock data for GitHub Pages',
          data: []
        }
      };
    }
    
    return Promise.reject(error);
  }
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
export const del = async (url) => {
  try {
    const response = await api.delete(url);
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

export default api; 