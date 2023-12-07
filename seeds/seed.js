const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
    // Sync the models with the database, forcing the creation of new tables
    await sequelize.sync({ force: true });

    // Create users using bulkCreate and individualHooks for hashing passwords
    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    // Create posts using bulkCreate
    const posts = await Post.bulkCreate(postData, {
        returning: true,
    });

    // Create comments using data from commentData and random user IDs
    for (const comments of commentData) {
        await Comment.create({
            ...comments,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    // Exit the process
    process.exit(0);
};

// Call the seedDatabase function
seedDatabase();
