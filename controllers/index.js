const router = require('express').Router();

const apiRoutes = require('./api');
const loginRoute = require('./loginRoute.js');
const homeRoutes = require('./homeRoutes.js');
const profileRoute = require('./profileRoute.js')
const postRoute = require('./postRoute.js')

router.use('/api', apiRoutes);
router.use('/', loginRoute);
router.use('/homepage', homeRoutes);
router.use('/profile', profileRoute);
router.use('/posts', postRoute);

module.exports = router;