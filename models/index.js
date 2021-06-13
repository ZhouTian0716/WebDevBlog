const Account = require("./Account");
const Blog = require("./Blog");
const Comment = require("./Comment");
const User = require("./User");

// Account
Account.hasOne(User, { onDelete: "cascade" });
User.belongsTo(Account, { foreignKey: "account_id" });

// User
User.hasMany(Blog, { foreignKey: "user_id", onDelete: "cascade" });
Blog.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Comment, { foreignKey: "user_id", onDelete: "cascade" });
Comment.belongsTo(User, { foreignKey: "user_id" });

// Blog
Blog.hasMany(Comment, { foreignKey: "blog_id", onDelete: "cascade" });
Comment.belongsTo(Blog, { foreignKey: "blog_id" });


module.exports = {
  User,
  Blog,
  Comment,
  Account,
};
