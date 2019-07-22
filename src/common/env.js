require('dotenv').config()

/**
 * This is the base env object for both the main and renderer processes
 */
export default {
  ...process.env,
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV !== 'production'
}
