const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const env = require('./config/env');
const healthRouter = require('./routes/health');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');
const authRouter = require('./routes/auth');
const app = express();

// Security & utility middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging - more verbose in dev, minimal in prod
app.use(morgan(env.isDevelopment ? 'dev' : 'combined'));

// Routes
app.use('/api/health', healthRouter);
app.use('/api/auth', authRouter);
// 404 handler - must come after all routes
app.use(notFound);

// Global error handler - must be last
app.use(errorHandler);

module.exports = app;