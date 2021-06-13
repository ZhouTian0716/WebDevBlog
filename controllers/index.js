const router = require("express").Router();

// BackEnd URL
const apiRoutes = require("./api");
// FrontEnd URL
const homeRoute = require("./homeRoute");
const dashboardRoute = require("./dashboardRoute");

router.use("/", homeRoute);
router.use("/dashboard", dashboardRoute);



router.use("/api", apiRoutes);

module.exports = router;
