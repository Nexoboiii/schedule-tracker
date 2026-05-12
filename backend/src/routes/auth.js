const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const { registerValidator, loginValidator } = require('../middleware/validators/authValidators');
const validate = require('../middleware/validate');
const { registerLimiter, loginLimiter } = require('../middleware/rateLimiters');
const router = express.Router();

router.post('/register', 
    registerLimiter,
    registerValidator, 
    validate, 
    authController.register
);

router.post('/login', 
    loginLimiter,
    loginValidator, 
    validate, 
    authController.login
);

router.get('/me', 
    authMiddleware, 
    authController.getMe
);

module.exports = router;