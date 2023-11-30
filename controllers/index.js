const router = require('express').Router();

const apiRoutes = require('./api');
const loginRoute = require('./loginRoute.js');
const homeRoutes = require('./homeRoutes.js');

router.use('/api', apiRoutes);
router.use('/', loginRoute);
router.use('/home', homeRoutes);

module.exports = router;