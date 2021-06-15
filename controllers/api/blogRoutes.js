const router = require("express").Router();
const { Blog } = require("../../models");
const withAuth = require('../../utils/auth');

// Route to Get All
router.get("/", async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      order: [["id", "ASC"]],
    });
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to Get By ID
router.get("/:id", withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id);
    if (!blogData) {
      res.status(404).json({ message: "No Blog found with this id!" });
      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to Create New
router.post("/", withAuth, async (req, res) => {
  try {
    const blogNew = await Blog.create({
      ...req.body,
      // This get Blog linked with the login account
      user_id: req.session.account_id,
    });
    // console.log(req.session.account_id);
    res.status(200).json(blogNew);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to Update By ID
router.put("/:id", withAuth, async (req, res) => {
  try {
    const blogData = await Blog.update(req.body, {
      where: {
        id: req.params.id,
      },
      // This get Blog linked with the login account
      user_id: req.session.account_id,
    });
    res.status(200).json(blogData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to Delete By ID
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.account_id,
      },
    });
    if (!blogData) {
      res.status(404).json({ message: "No Blog found with this id!" });
      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
