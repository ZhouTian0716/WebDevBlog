const sequelize = require("../config/connection");
const { Account, Blog, Comment, User } = require("../models");

const accountData = require("./account.json");
const blogData = require("./blog.json");
const commentData = require("./comment.json"); 
const userData = require("./user.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await Account.bulkCreate(accountData, {
    individualHooks: true,
    returning: true,
  });
  console.log('\n----- Account SEEDED -----\n');

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  console.log('\n----- User SEEDED -----\n');

  await Blog.bulkCreate(blogData, {
    individualHooks: true,
    returning: true,
  });
  console.log('\n----- Blog SEEDED -----\n');

  await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });
  console.log('\n----- Comment SEEDED -----\n');

  process.exit(0);
};

seedDatabase();
