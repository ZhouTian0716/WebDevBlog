const sequelize = require("../config/connection");
const {
  Account,
  Blog,
  Comment,
  User,
} = require("../models");

const accountData = require("./account.json");
const blogData = require("./blog.json");
const commentData = require("./comment.json");
const userData = require("./user.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Account.bulkCreate(accountData, {
    individualHooks: true,
    returning: true,
  });

  await Blog.bulkCreate(blogData, {
    individualHooks: true,
    returning: true,
  });

  await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
