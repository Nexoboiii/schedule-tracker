const rateLimit = require('express-rate-limit');

const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit each IP to 5 requests per windowMs
  message: { error: { message: 'Too many registration attempts from this IP, please try again after an hour' } }
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: { error: { message: 'Too many login attempts from this IP, please try again after 15 minutes' } }
});

module.exports = {
  registerLimiter,
  loginLimiter,
};