const router = require("express").Router();
const { Account, Blog, Comment, User} = require("../models");
const withAuth = require("../utils/auth");

// This is passing data for blog page rendering
router.get("/:id", async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
        },
      ],
    });
    const blog = blogData.get({ plain: true });

    res.render("blog", {
      layout: "layout-1",
      blog,
      user:blog.user,
      comments:blog.comments,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

