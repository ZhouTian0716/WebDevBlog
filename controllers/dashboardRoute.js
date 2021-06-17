const router = require("express").Router();
const { Account, Blog, Comment, User} = require("../models");
const withAuth = require("../utils/auth");

// This is passing data for dashboard page rendering
router.get("/", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const accountData = await Account.findByPk(req.session.account_id, {
      attributes: { exclude: ["password"] },
    });

    const userInfo = await User.findByPk(req.session.account_id, {
      // Include all those blogs and comments that belong to this user
      include: [
        {
          model: Blog,
        },
        {
          model: Comment,
        },
      ],
    });

    const account = accountData.get({ plain: true });
    const user = userInfo.get({ plain: true });
    // console.log(account);
    // console.log(user);
    
    res.render("dashboard", {
      layout: "layout-1",
      account,
      user,
      blogs: user.blogs,
      comments:user.comments,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
