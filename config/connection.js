// Import the Sequelize library
const Sequelize = require('sequelize');

// Load environment variables
require('dotenv').config();

// Initialize Sequelize instance
let sequelize;

// Check if connected to a JawsDB instance (Heroku)
if (process.env.JAWSDB_URL) {
    // Connect to JawsDB using the provided URL
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    // Connect to local MySQL database
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: 'localhost',
            dialect: 'mysql',
            database: 'social_db',
            port: 3306
        }
    );
}

// Export the Sequelize instance
module.exports = sequelize;
