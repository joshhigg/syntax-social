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



module.exports = router;