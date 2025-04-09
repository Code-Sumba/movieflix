/**
 * Format date to localized string
 * @param {string|Date} date - Date string or Date object
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
export const formatDate = (date, options = {}) => {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    // Default options
    const defaultOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...options
    };
    
    return new Intl.DateTimeFormat(navigator.language, defaultOptions).format(dateObj);
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

/**
 * Format date to short format (e.g., MM/DD/YYYY)
 * @param {string|Date} date - Date string or Date object
 * @returns {string} Formatted date string
 */
export const formatShortDate = (date) => {
  return formatDate(date, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

/**
 * Format date to ISO string (YYYY-MM-DD)
 * @param {string|Date} date - Date string or Date object
 * @returns {string} ISO formatted date
 */
export const formatISODate = (date) => {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toISOString().split('T')[0];
  } catch (error) {
    console.error('Error formatting date to ISO:', error);
    return '';
  }
};

/**
 * Format time to localized string
 * @param {string|Date} date - Date string or Date object
 * @param {boolean} includeSeconds - Whether to include seconds
 * @returns {string} Formatted time string
 */
export const formatTime = (date, includeSeconds = false) => {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      ...(includeSeconds ? { second: '2-digit' } : {})
    };
    
    return new Intl.DateTimeFormat(navigator.language, options).format(dateObj);
  } catch (error) {
    console.error('Error formatting time:', error);
    return '';
  }
};

/**
 * Format date and time to localized string
 * @param {string|Date} date - Date string or Date object
 * @param {boolean} includeSeconds - Whether to include seconds
 * @returns {string} Formatted date and time string
 */
export const formatDateTime = (date, includeSeconds = false) => {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      ...(includeSeconds ? { second: '2-digit' } : {})
    };
    
    return new Intl.DateTimeFormat(navigator.language, options).format(dateObj);
  } catch (error) {
    console.error('Error formatting date and time:', error);
    return '';
  }
};

/**
 * Format relative time (e.g., "2 hours ago", "yesterday")
 * @param {string|Date} date - Date string or Date object
 * @returns {string} Relative time string
 */
export const formatRelativeTime = (date) => {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffMs = now - dateObj;
    
    // Convert to seconds
    const diffSec = Math.floor(diffMs / 1000);
    
    // Less than a minute
    if (diffSec < 60) {
      return 'just now';
    }
    
    // Less than an hour
    if (diffSec < 3600) {
      const minutes = Math.floor(diffSec / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }
    
    // Less than a day
    if (diffSec < 86400) {
      const hours = Math.floor(diffSec / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
    
    // Less than a week
    if (diffSec < 604800) {
      const days = Math.floor(diffSec / 86400);
      
      if (days === 1) {
        return 'yesterday';
      }
      
      return `${days} days ago`;
    }
    
    // Less than a month
    if (diffSec < 2592000) {
      const weeks = Math.floor(diffSec / 604800);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    }
    
    // Less than a year
    if (diffSec < 31536000) {
      const months = Math.floor(diffSec / 2592000);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    }
    
    // More than a year
    const years = Math.floor(diffSec / 31536000);
    return `${years} year${years > 1 ? 's' : ''} ago`;
  } catch (error) {
    console.error('Error formatting relative time:', error);
    return '';
  }
};

/**
 * Get year from date
 * @param {string|Date} date - Date string or Date object
 * @returns {number|null} Year or null if invalid
 */
export const getYear = (date) => {
  if (!date) return null;
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.getFullYear();
  } catch (error) {
    console.error('Error getting year:', error);
    return null;
  }
};

/**
 * Format duration in minutes to hours and minutes
 * @param {number} minutes - Duration in minutes
 * @returns {string} Formatted duration string
 */
export const formatDuration = (minutes) => {
  if (!minutes && minutes !== 0) return '';
  
  try {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours === 0) {
      return `${mins}m`;
    }
    
    if (mins === 0) {
      return `${hours}h`;
    }
    
    return `${hours}h ${mins}m`;
  } catch (error) {
    console.error('Error formatting duration:', error);
    return '';
  }
};

/**
 * Format duration in seconds to minutes and seconds
 * @param {number} seconds - Duration in seconds
 * @returns {string} Formatted duration string (MM:SS)
 */
export const formatTimeFromSeconds = (seconds) => {
  if (!seconds && seconds !== 0) return '';
  
  try {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  } catch (error) {
    console.error('Error formatting time from seconds:', error);
    return '';
  }
};

/**
 * Check if date is in the past
 * @param {string|Date} date - Date string or Date object
 * @returns {boolean} True if date is in the past
 */
export const isPastDate = (date) => {
  if (!date) return false;
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    return dateObj < now;
  } catch (error) {
    console.error('Error checking if date is in past:', error);
    return false;
  }
};

/**
 * Check if date is in the future
 * @param {string|Date} date - Date string or Date object
 * @returns {boolean} True if date is in the future
 */
export const isFutureDate = (date) => {
  if (!date) return false;
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    return dateObj > now;
  } catch (error) {
    console.error('Error checking if date is in future:', error);
    return false;
  }
};

/**
 * Calculate days between two dates
 * @param {string|Date} startDate - Start date
 * @param {string|Date} endDate - End date
 * @returns {number|null} Number of days between dates
 */
export const getDaysBetween = (startDate, endDate) => {
  if (!startDate || !endDate) return null;
  
  try {
    const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
    const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
    
    // Set both dates to midnight to ignore time
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    
    // Calculate difference in days
    const diffMs = end - start;
    return Math.round(diffMs / (1000 * 60 * 60 * 24));
  } catch (error) {
    console.error('Error calculating days between dates:', error);
    return null;
  }
};

/**
 * Add days to a date
 * @param {string|Date} date - Base date
 * @param {number} days - Number of days to add
 * @returns {Date|null} New date
 */
export const addDays = (date, days) => {
  if (!date) return null;
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : new Date(date);
    dateObj.setDate(dateObj.getDate() + days);
    return dateObj;
  } catch (error) {
    console.error('Error adding days to date:', error);
    return null;
  }
};

export default {
  formatDate,
  formatShortDate,
  formatISODate,
  formatTime,
  formatDateTime,
  formatRelativeTime,
  getYear,
  formatDuration,
  formatTimeFromSeconds,
  isPastDate,
  isFutureDate,
  getDaysBetween,
  addDays
}; 