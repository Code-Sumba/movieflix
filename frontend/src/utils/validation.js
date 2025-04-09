/**
 * Email validation
 * @param {string} email - Email to validate
 * @returns {boolean} True if email is valid
 */
export const isValidEmail = (email) => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Password validation (minimum 8 characters, at least one letter and one number)
 * @param {string} password - Password to validate
 * @returns {boolean} True if password meets requirements
 */
export const isValidPassword = (password) => {
  if (!password) return false;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
  return passwordRegex.test(password);
};

/**
 * Check if passwords match
 * @param {string} password - Password
 * @param {string} confirmPassword - Confirm password
 * @returns {boolean} True if passwords match
 */
export const doPasswordsMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};

/**
 * URL validation
 * @param {string} url - URL to validate
 * @returns {boolean} True if URL is valid
 */
export const isValidUrl = (url) => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Check if string is empty
 * @param {string} value - String to check
 * @returns {boolean} True if string is empty or just whitespace
 */
export const isEmpty = (value) => {
  return value === undefined || value === null || value.trim() === '';
};

/**
 * Check if value is a number
 * @param {*} value - Value to check
 * @returns {boolean} True if value is a number
 */
export const isNumber = (value) => {
  return !isNaN(Number(value));
};

/**
 * Check if value is a valid date
 * @param {*} value - Value to check
 * @returns {boolean} True if value is a valid date
 */
export const isValidDate = (value) => {
  if (!value) return false;
  const date = new Date(value);
  return !isNaN(date.getTime());
};

/**
 * Check if value is within a range
 * @param {number} value - Value to check
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {boolean} True if value is within range
 */
export const isInRange = (value, min, max) => {
  if (!isNumber(value)) return false;
  const num = Number(value);
  return num >= min && num <= max;
};

/**
 * Check if value has minimum length
 * @param {string} value - String to check
 * @param {number} minLength - Minimum length
 * @returns {boolean} True if string length is at least minLength
 */
export const hasMinLength = (value, minLength) => {
  if (!value) return false;
  return value.length >= minLength;
};

/**
 * Check if value has maximum length
 * @param {string} value - String to check
 * @param {number} maxLength - Maximum length
 * @returns {boolean} True if string length is at most maxLength
 */
export const hasMaxLength = (value, maxLength) => {
  if (!value) return true; // Empty values are valid for max length
  return value.length <= maxLength;
};

/**
 * Check if value matches a specific pattern
 * @param {string} value - String to check
 * @param {RegExp} pattern - Regular expression pattern
 * @returns {boolean} True if string matches pattern
 */
export const matchesPattern = (value, pattern) => {
  if (!value) return false;
  return pattern.test(value);
};

/**
 * Validate a username (alphanumeric with underscores, 3-30 characters)
 * @param {string} username - Username to validate
 * @returns {boolean} True if username is valid
 */
export const isValidUsername = (username) => {
  if (!username) return false;
  const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
  return usernameRegex.test(username);
};

/**
 * Validate a phone number (basic validation)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if phone number appears valid
 */
export const isValidPhone = (phone) => {
  if (!phone) return false;
  // Basic phone number validation (at least 10 digits)
  const phoneRegex = /^\+?[0-9]{10,15}$/;
  return phoneRegex.test(phone.replace(/[\s()\-]/g, ''));
};

/**
 * Create a validator for a form field
 * @param {Function} validationFn - Validation function
 * @param {string} errorMessage - Error message if validation fails
 * @returns {Function} Validator function
 */
export const createValidator = (validationFn, errorMessage) => {
  return (value) => {
    if (!validationFn(value)) {
      return errorMessage;
    }
    return '';
  };
};

/**
 * Run multiple validators on a value
 * @param {*} value - Value to validate
 * @param {Array<Function>} validators - Array of validator functions
 * @returns {string} First error message or empty string if valid
 */
export const runValidators = (value, validators) => {
  for (const validator of validators) {
    const error = validator(value);
    if (error) {
      return error;
    }
  }
  return '';
};

/**
 * Create common form validation rules
 * @returns {Object} Object with validation rules
 */
export const createValidationRules = () => {
  return {
    required: createValidator((value) => !isEmpty(value), 'This field is required'),
    email: createValidator(isValidEmail, 'Please enter a valid email address'),
    password: createValidator(isValidPassword, 'Password must be at least 8 characters with at least one letter and one number'),
    username: createValidator(isValidUsername, 'Username must be 3-30 characters and can only contain letters, numbers, and underscores'),
    phone: createValidator(isValidPhone, 'Please enter a valid phone number'),
    url: createValidator(isValidUrl, 'Please enter a valid URL'),
    minLength: (min) => createValidator(
      (value) => hasMinLength(value, min), 
      `Must be at least ${min} characters`
    ),
    maxLength: (max) => createValidator(
      (value) => hasMaxLength(value, max), 
      `Must be no more than ${max} characters`
    ),
    numberRange: (min, max) => createValidator(
      (value) => isInRange(value, min, max), 
      `Must be a number between ${min} and ${max}`
    )
  };
};

export default {
  isValidEmail,
  isValidPassword,
  doPasswordsMatch,
  isValidUrl,
  isEmpty,
  isNumber,
  isValidDate,
  isInRange,
  hasMinLength,
  hasMaxLength,
  matchesPattern,
  isValidUsername,
  isValidPhone,
  createValidator,
  runValidators,
  createValidationRules
}; 