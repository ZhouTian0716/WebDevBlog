const router = require("express").Router();
const { Account, Blog, Comment, User} = require("../models");

// This is passing data for blog page rendering
router.get("/:id", async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['id', 'name'],
        },
      ],
    });
    const blog = blogData.get({ plain: true });

    const commentData = await Comment.findAll({
      where: {blog_id:req.params.id,},
       include: [
        {
          model: User,
          attributes: ['id', 'name','icon'],
        },
      ],  
    });
    const comments = commentData.map((comment) => comment.get({ plain: true }));
   
    // const accountData = await Account.findByPk(req.session.account_id, {
    //   include: [
    //     {
    //       model: User,
    //       attributes: ['name','icon'],
    //     },
    //   ],
    // });
    // const account = accountData.get({ plain: true });

    res.render("blog", {
      layout: "layout-1",
      blog,
      user:blog.user,
      comments,
      logged_in: req.session.logged_in,
      // account,
      sessionId: req.session.account_id
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;

