const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// /home route
// Get all Posts for the homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }))

        res.render('homepage', {
            posts,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

// Get specific post - ability to add comments and likes
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Comment,
                    include: {
                        model: User,
                        attributes: ['name'],
                    }
                }
            ],
        });
        const post = postData.get({ plain: true });

        res.render('post', {
            post
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

// User self profile page
router.get('/profile', withAuth, async (req, res) => {
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
router.get('/profile/:id', withAuth, async (req, res) => {
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