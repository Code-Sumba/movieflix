// Format duration from minutes to hours and minutes
export const formatDuration = (minutes) => {
  if (!minutes || isNaN(minutes)) return 'N/A';
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) return `${mins}m`;
  return `${hours}h ${mins}m`;
};

// Format date to readable format
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
};

// Format file size
export const formatFileSize = (bytes) => {
  if (!bytes || isNaN(bytes)) return 'N/A';
  
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;
  
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  
  return `${size.toFixed(1)} ${units[unitIndex]}`;
};

// Truncate text with ellipsis
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  
  return text.substr(0, maxLength) + '...';
};

// Generate random color based on string (for avatars, etc.)
export const stringToColor = (string) => {
  if (!string) return '#000000';
  
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  
  return color;
};

// Extract initials from name
export const getInitials = (name) => {
  if (!name) return '';
  
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

// Format number with commas
export const formatNumber = (num) => {
  if (num === undefined || num === null) return '0';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Get year from date
export const getYearFromDate = (dateString) => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return date.getFullYear().toString();
  } catch (error) {
    console.error('Error getting year:', error);
    return '';
  }
};

// Convert rating (0-10) to stars (0-5)
export const ratingToStars = (rating) => {
  if (rating === undefined || rating === null) return 0;
  return Math.round((rating / 10) * 5 * 2) / 2; // Round to nearest 0.5
};

// Format rating for display
export const formatRating = (rating) => {
  if (rating === undefined || rating === null) return 'N/A';
  return rating.toFixed(1);
};

// Scroll to top of page smoothly
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// Debounce function for search inputs, etc.
export const debounce = (func, wait = 300) => {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Get URL for movie poster with fallback
export const getPosterUrl = (path, size = 'w500') => {
  if (!path) return '/images/movie-placeholder.png';
  
  // Assuming the API returns poster paths that need to be prefixed
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

// Generate a shareable link
export const getShareableLink = (type, id) => {
  return `${window.location.origin}/${type}/${id}`;
};

// Copy text to clipboard
export const copyToClipboard = async (text) => {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      return success;
    }
  } catch (error) {
    console.error('Failed to copy:', error);
    return false;
  }
};

export default {
  formatDuration,
  formatDate,
  formatFileSize,
  truncateText,
  stringToColor,
  getInitials,
  formatNumber,
  getYearFromDate,
  ratingToStars,
  formatRating,
  scrollToTop,
  debounce,
  getPosterUrl,
  getShareableLink,
  copyToClipboard
}; 