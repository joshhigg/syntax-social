const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Define associations between User, Post, and Comment models

// User has many Posts with foreign key user_id, and onDelete set to 'Cascade'
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'Cascade'
});

// User has many Comments with foreign key user_id, and onDelete set to 'Cascade'
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'Cascade'
});

// Post belongs to a User with foreign key user_id
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

// Post has many Comments with foreign key post_id, and onDelete set to 'Cascade'
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'Cascade'
});

// Comment belongs to a User with foreign key user_id
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

// Comment belongs to a Post with foreign key post_id
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

// Export the User, Post, and Comment models
module.exports = { User, Post, Comment };
