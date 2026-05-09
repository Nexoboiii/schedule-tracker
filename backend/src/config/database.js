require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    dialect: 'postgres',
  },
  test: {
    // similar, but use a separate test DB name like 'schedule_tracker_test'
    // you won't use this for a while, but set it up for completeness
  },
  production: {
    // we'll fill this in during AWS deployment - leave as a placeholder for now
    // hint: in production, AWS gives you a single DATABASE_URL string
    // Sequelize accepts that with the `use_env_variable` key
  },
};
