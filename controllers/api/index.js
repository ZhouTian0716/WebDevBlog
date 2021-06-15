const router = require("express").Router();
const accountRoutes = require("./accountRoutes");
const blogRoutes = require("./blogRoutes");
const commentRoutes = require("./commentRoutes");
const userRoutes = require("./userRoutes");

router.use("/account", accountRoutes);
router.use("/blog", blogRoutes);
router.use("/comment", commentRoutes);
router.use("/user", userRoutes);

module.exports = router;
