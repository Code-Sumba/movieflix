// Theme keys
const THEME_KEY = 'movieflix_theme';
const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';

/**
 * Get the current theme from localStorage or system preference
 * @returns {string} 'dark' or 'light'
 */
export const getCurrentTheme = () => {
  // Check if theme is stored in localStorage
  const storedTheme = localStorage.getItem(THEME_KEY);
  if (storedTheme) {
    return storedTheme;
  }
  
  // If no stored theme, check system preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return THEME_DARK;
  }
  
  // Default to light theme
  return THEME_LIGHT;
};

/**
 * Set theme in localStorage and apply it to document
 * @param {string} theme - 'dark' or 'light'
 */
export const setTheme = (theme) => {
  if (theme !== THEME_DARK && theme !== THEME_LIGHT) {
    console.error('Invalid theme:', theme);
    return;
  }
  
  // Store theme in localStorage
  localStorage.setItem(THEME_KEY, theme);
  
  // Apply theme to document
  applyTheme(theme);
};

/**
 * Apply theme to document by setting data-theme attribute
 * @param {string} theme - 'dark' or 'light'
 */
export const applyTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  
  // Optional: Update meta theme-color for mobile browsers
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute(
      'content', 
      theme === THEME_DARK ? '#121212' : '#ffffff'
    );
  }
};

/**
 * Toggle between dark and light theme
 * @returns {string} The new theme
 */
export const toggleTheme = () => {
  const currentTheme = getCurrentTheme();
  const newTheme = currentTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
  setTheme(newTheme);
  return newTheme;
};

/**
 * Initialize theme based on stored preference or system preference
 */
export const initializeTheme = () => {
  // Apply the current theme
  applyTheme(getCurrentTheme());
  
  // Set up listener for system preference changes
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        // Only change theme if user hasn't explicitly set a preference
        if (!localStorage.getItem(THEME_KEY)) {
          applyTheme(e.matches ? THEME_DARK : THEME_LIGHT);
        }
      });
  }
};

/**
 * Get color with opacity
 * @param {string} hex - Hex color code
 * @param {number} alpha - Opacity value (0-1)
 * @returns {string} RGBA color string
 */
export const hexToRgba = (hex, alpha = 1) => {
  if (!hex) return '';
  
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Convert 3-digit hex to 6-digit
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  
  // Parse hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Return rgba string
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/**
 * Lighten or darken a color
 * @param {string} hex - Hex color code
 * @param {number} amount - Amount to lighten (positive) or darken (negative), -100 to 100
 * @returns {string} Modified hex color
 */
export const adjustColor = (hex, amount) => {
  if (!hex) return '';
  
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Convert 3-digit hex to 6-digit
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  
  // Convert to RGB
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  
  // Adjust color
  const adjustment = Math.floor(amount * 2.55); // Convert percent to 0-255 scale
  r = Math.max(0, Math.min(255, r + adjustment));
  g = Math.max(0, Math.min(255, g + adjustment));
  b = Math.max(0, Math.min(255, b + adjustment));
  
  // Convert back to hex
  const newHex = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  return `#${newHex}`;
};

/**
 * Check if a color is dark
 * @param {string} hex - Hex color code
 * @returns {boolean} True if color is dark
 */
export const isColorDark = (hex) => {
  if (!hex) return false;
  
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Convert 3-digit hex to 6-digit
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  
  // Parse hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Calculate perceived brightness (YIQ formula)
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return yiq < 128;
};

/**
 * Get appropriate text color for background
 * @param {string} bgColor - Background color in hex
 * @returns {string} Text color in hex (#ffffff or #000000)
 */
export const getContrastColor = (bgColor) => {
  return isColorDark(bgColor) ? '#ffffff' : '#000000';
};

/**
 * Create an RGB gradient string
 * @param {string} startColor - Starting color hex
 * @param {string} endColor - Ending color hex
 * @param {string} direction - Gradient direction (e.g., 'to right', 'to bottom')
 * @returns {string} Linear gradient CSS value
 */
export const createGradient = (startColor, endColor, direction = 'to right') => {
  return `linear-gradient(${direction}, ${startColor}, ${endColor})`;
};

/**
 * Apply specific styles for different screen sizes
 * @param {Object} styles - Object with styles for different breakpoints
 * @returns {Object} Responsive style object
 */
export const getResponsiveStyles = (styles) => {
  const { xs, sm, md, lg, xl } = styles;
  
  // Default breakpoints (can be adjusted)
  const breakpoints = {
    xs: '@media (max-width: 575px)',
    sm: '@media (min-width: 576px) and (max-width: 767px)',
    md: '@media (min-width: 768px) and (max-width: 991px)',
    lg: '@media (min-width: 992px) and (max-width: 1199px)',
    xl: '@media (min-width: 1200px)',
  };
  
  const responsiveStyles = {};
  
  if (xs) responsiveStyles[breakpoints.xs] = xs;
  if (sm) responsiveStyles[breakpoints.sm] = sm;
  if (md) responsiveStyles[breakpoints.md] = md;
  if (lg) responsiveStyles[breakpoints.lg] = lg;
  if (xl) responsiveStyles[breakpoints.xl] = xl;
  
  return responsiveStyles;
};

export default {
  getCurrentTheme,
  setTheme,
  applyTheme,
  toggleTheme,
  initializeTheme,
  hexToRgba,
  adjustColor,
  isColorDark,
  getContrastColor,
  createGradient,
  getResponsiveStyles,
  THEME_DARK,
  THEME_LIGHT
}; 