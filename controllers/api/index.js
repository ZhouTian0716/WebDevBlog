const router = require("express").Router();
const accountRoutes = require("./accountRoutes");
const blogRoutes = require("./blogRoutes");
// const commentRoutes = require("./commentRoutes");
const userRoutes = require("./userRoutes");



router.use("/accounts", accountRoutes);

router.use("/blogs", blogRoutes);

// router.use("/comments", commentRoutes);

router.use("/users", userRoutes);



module.exports = router;
