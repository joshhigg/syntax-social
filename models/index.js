// Import Sequelize and models
const { User, Post, Comment } = require('./models');

// Define associations between User, Post, and Comment models
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE', // Specify the behavior on deletion
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
});

// Export the models with associations for use in other parts of the application
module.exports = { User, Post, Comment };
