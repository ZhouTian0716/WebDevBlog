const Account = require("./Account");
const Blog = require("./Blog");
const Comment = require("./Comment");
const User = require("./User");

// Account
Account.hasOne(User, {
  foreignKey: "account_id",
  onDelete: 'CASCADE'
});

User.belongsTo(Account, {
  foreignKey: "account_id"
});

// User
User.hasMany(Blog, {
  foreignKey: "user_id",
  onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
  foreignKey: "user_id"
});

User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: "user_id"
});

// Blog
Blog.hasMany(Comment, {
  foreignKey: "blog_id",
  onDelete: 'CASCADE'
});

Comment.belongsTo(Blog, {
  foreignKey: "blog_id"
});


module.exports = { Account, Blog, Comment, User };