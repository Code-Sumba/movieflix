import apiUtils from './api';
import authUtils from './auth';
import dateTimeUtils from './dateTime';
import themeUtils from './theme';
import uiUtils from './ui';
import validationUtils from './validation';

export const api = apiUtils;
export const auth = authUtils;
export const dateTime = dateTimeUtils;
export const theme = themeUtils;
export const ui = uiUtils;
export const validation = validationUtils;

export default {
  api,
  auth,
  dateTime,
  theme,
  ui,
  validation
}; 