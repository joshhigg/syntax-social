// Import Express and Nodemailer
const router = require('express').Router();



// Set up routes for rendering login and signup pages
router.get('/', (req, res) => {
    res.render('login');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

// Export the router for use in the main application
module.exports = router;
