import api from './api';

// Token storage keys
const TOKEN_KEY = 'movieflix_token';
const USER_KEY = 'movieflix_user';

/**
 * Save authentication token to local storage
 * @param {string} token - JWT token
 */
export const setToken = (token) => {
  if (!token) return;
  localStorage.setItem(TOKEN_KEY, token);
};

/**
 * Get authentication token from local storage
 * @returns {string|null} The stored token or null if not found
 */
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Remove authentication token from local storage
 */
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

/**
 * Save user data to local storage
 * @param {Object} user - User data object
 */
export const setUser = (user) => {
  if (!user) return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

/**
 * Get user data from local storage
 * @returns {Object|null} The user object or null if not found
 */
export const getUser = () => {
  const userData = localStorage.getItem(USER_KEY);
  if (!userData) return null;
  
  try {
    return JSON.parse(userData);
  } catch (error) {
    console.error('Failed to parse user data:', error);
    return null;
  }
};

/**
 * Remove user data from local storage
 */
export const removeUser = () => {
  localStorage.removeItem(USER_KEY);
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if user is authenticated
 */
export const isAuthenticated = () => {
  const token = getToken();
  return !!token;
};

/**
 * Get user role from stored user data
 * @returns {string|null} User role or null if not found
 */
export const getUserRole = () => {
  const user = getUser();
  return user ? user.role : null;
};

/**
 * Check if current user has admin role
 * @returns {boolean} True if user has admin role
 */
export const isAdmin = () => {
  const role = getUserRole();
  return role === 'admin';
};

/**
 * Decode JWT token to get payload
 * @param {string} token - JWT token
 * @returns {Object|null} Decoded token payload or null if invalid
 */
export const decodeToken = (token) => {
  if (!token) return null;
  
  try {
    // Split the token and get the payload (second part)
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};

/**
 * Check if token is expired
 * @param {string} token - JWT token
 * @returns {boolean} True if token is expired or invalid
 */
export const isTokenExpired = (token) => {
  const decodedToken = decodeToken(token);
  if (!decodedToken) return true;
  
  // Get current time and expiration time (exp is in seconds)
  const currentTime = Math.floor(Date.now() / 1000);
  return decodedToken.exp < currentTime;
};

/**
 * Check and handle token expiration
 * @returns {boolean} True if token is valid, false if expired
 */
export const validateToken = () => {
  const token = getToken();
  if (!token) return false;
  
  if (isTokenExpired(token)) {
    // Clear authentication data if token is expired
    logout();
    return false;
  }
  
  return true;
};

/**
 * Log user out by clearing all authentication data
 */
export const logout = () => {
  removeToken();
  removeUser();
};

// Authentication API calls
export const authApi = {
  // Login user
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      // Store token and user data
      setToken(token);
      setUser(user);
      
      return { token, user };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  // Register user
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },
  
  // Get current user profile
  getProfile: async () => {
    try {
      const response = await api.get('/auth/profile');
      
      // Update stored user data
      setUser(response.data);
      
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  },
  
  // Update user profile
  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/auth/profile', profileData);
      
      // Update stored user data
      setUser(response.data);
      
      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },
  
  // Change password
  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await api.put('/auth/change-password', {
        currentPassword,
        newPassword
      });
      return response.data;
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  },
  
  // Request password reset
  requestPasswordReset: async (email) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      console.error('Error requesting password reset:', error);
      throw error;
    }
  },
  
  // Reset password with token
  resetPassword: async (token, newPassword) => {
    try {
      const response = await api.post('/auth/reset-password', {
        token,
        newPassword
      });
      return response.data;
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  }
};

// Configure axios interceptor to include token in requests
export const setupAuthInterceptor = () => {
  api.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      // Handle 401 Unauthorized responses
      if (error.response && error.response.status === 401) {
        // Log out user if token is invalid/expired
        logout();
        // Redirect to login page or show notification
        // window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
};

export default {
  setToken,
  getToken,
  removeToken,
  setUser,
  getUser,
  removeUser,
  isAuthenticated,
  getUserRole,
  isAdmin,
  decodeToken,
  isTokenExpired,
  validateToken,
  logout,
  authApi,
  setupAuthInterceptor
}; 