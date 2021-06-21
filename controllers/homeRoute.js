const router = require("express").Router();
const { Blog, User } = require("../models");
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

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    
    // Pass serialized data and session flag into template
    res.render('home', { 
      layout:'layout-1',
      blogs, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
