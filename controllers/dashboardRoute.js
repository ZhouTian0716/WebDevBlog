const router = require("express").Router();
const {
  Account,
  Blog,
  Comment,
  User,
} = require("../models");
const withAuth = require("../utils/auth");

//route to dashboard
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const accountData = await Account.findByPk(req.session.account_id, {
      attributes: { exclude: ["password"] },
    });

    const userInfo = await User.findByPk(req.session.account_id, {
      include: [
        {
          model: Blog,
        },
        {
          model: Comment,
        },
      ],
    });

    const user = userInfo.get({ plain: true });
    const account = accountData.get({ plain: true });
  

    res.render("dashboard", {
      layout: "layout-2",
      account,
      user,
      blog: user.blog,
      comment: user.comment,
      comment: blog.comment,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
