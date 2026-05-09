const app = require('./src/app');
const env = require('./src/config/env');
const db = require('./src/models');

async function start() {
  try {
    await db.sequelize.authenticate();
    console.log('Database connection established successfully.');
    const server = app.listen(env.port, () => {
    console.log(`Server running on http://localhost:${env.port}`);
    console.log(`Environment: ${env.nodeEnv}`);
    });

    // Graceful shutdown - clean up when the process is asked to stop
    const shutdown = (signal) => {
      console.log(`\n${signal} received. Shutting down gracefully...`);
      server.close(() => {
        console.log('Server closed.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    process.exit(1); // Exit with failure code
  }
}

start();
