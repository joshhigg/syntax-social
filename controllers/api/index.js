// Import Express and create a router
const router = require('express').Router();

// Import modular route handlers for users, posts, and comments
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoute');

// Use the modular route handlers for specific paths
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

// Export the router for use in the main application
module.exports = router;
