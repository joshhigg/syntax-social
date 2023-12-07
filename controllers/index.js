// Import Express and create a router
const router = require('express').Router();

// Import modular route handlers for API, login, homepage, profile, and posts
const apiRoutes = require('./api');
const loginRoute = require('./loginRoute.js');
const homeRoutes = require('./homeRoutes.js');
const profileRoute = require('./profileRoute.js');
const postRoute = require('./postRoute.js');

// Use the modular route handlers for specific paths
router.use('/api', apiRoutes);
router.use('/', loginRoute);
router.use('/homepage', homeRoutes);
router.use('/profile', profileRoute);
router.use('/posts', postRoute);

// Export the router for use in the main application
module.exports = router;
