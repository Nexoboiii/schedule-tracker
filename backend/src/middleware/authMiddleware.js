const jwt = require('jsonwebtoken');
const env = require('../config/env');
const authService = require('../services/authService');

const authMiddleware = async (req, res, next) => {
  try {
    // 1. Get the Authorization header
    const authHeader = req.headers.authorization;
    // 2. Check it exists and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: { message: 'Authorization header is missing or invalid' } });
    }
    // 3. Extract the token
    const token = authHeader.slice(7); // "Bearer " is 7 characters
    
    // 4. Verify the token (jwt.verify)
    const decoded = jwt.verify(token, env.jwt.secret);  
    
    // 5. Look up the user from decoded.id
    const user = await authService.getUserById(decoded.id);
    // 6. If no user, 401
    if (!user) {
      return res.status(401).json({ error: { message: 'Invalid or expired token' } });
    }
    // 7. Attach to req.user and call next()
    req.user = user;
    next();
  } catch (err) {
    // jwt.verify threw — invalid or expired token
  
    return res.status(401).json({ error: { message: 'Invalid or expired token' } });
  }
};

module.exports = authMiddleware;