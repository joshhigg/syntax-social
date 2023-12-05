const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Get specific post - ability to add comments and likes
router.get('/:id', async (req, res) => {
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

module.exports = router