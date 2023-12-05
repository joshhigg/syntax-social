const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// User self profile page
router.get('/', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }]
        });
        
        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

// View other user's profiles
router.get('/:id', withAuth, async (req, res) => {
    try {
        // find specific user based on their user ID - Aren't able to view password or email of other users
        const userData = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password', 'email'] },
            include: [{ model: Post }]
        });

        const userProfile = userData.get({ plain: true });
        
        // May need to have a separate handlebars page for other profiles
        res.render('profile', {
            ...userProfile
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

module.exports = router;