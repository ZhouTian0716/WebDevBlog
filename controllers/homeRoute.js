const router = require("express").Router();
const {
  Account,
  Blog,
  Comment,
  User,
} = require("../models");
const withAuth = require("../utils/auth");

// This is home route, If the user is already logged in, redirect to user's dashboard page
router.get("/", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("home", {
    layout: "layout-1",
  });
});


router.get("/about", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }
  res.render("team", {
    layout: "main-about",
  });
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }
  res.render("home", {
    layout: "main",
  });
});

module.exports = router;
