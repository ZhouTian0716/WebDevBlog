const router = require("express").Router();
const { Account, Blog, User } = require("../models");
// const withAuth = require("../utils/auth");

// This is home page rendering
router.get('/', async (req, res) => {
  try {
    // Get all blogs and JOIN with user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
      order: [
        ['id', 'DESC']
      ]
    });

    // Get all Accounts and JOIN with user data
    const accountData = await Account.findAll({
      attributes: {exclude: ['password']},
      include: [
        {
          model: User,
          attributes: ['name', 'icon'],
        },
      ],
      order: [
        ['id', 'ASC']
      ]
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    const accounts = accountData.map((account) => account.get({ plain: true }));

    
    // Pass serialized data and session flag into template
    res.render('home', { 
      layout:'layout-1',
      blogs,
      accounts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
