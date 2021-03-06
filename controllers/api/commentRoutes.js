const router = require("express").Router();
const { Comment, User} = require("../../models");
const withAuth = require('../../utils/auth');

// Route to Get All
router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      order: [["id", "ASC"]],
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to Get All comments with blog ID
router.get("/blog/:id", async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      where: {blog_id:req.params.id,},
      include: [
        {
          model: User,
          attributes: ['name','icon'],
        },
      ],  
      order: [["id", "ASC"]],
    });
    
    const comments = commentData.map((comment) => comment.get({ plain: true }));
   
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});



// Route to Get By ID
router.get("/:id", async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id);
    if (!commentData) {
      res.status(404).json({ message: "No Comment found with this id!" });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to Create New
router.post("/", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
      ...req.body,
      // This get Comment linked with the login account
      user_id: req.session.account_id,
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to Update By ID
router.put("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
      // This get Comment linked with the login account
      user_id: req.session.account_id,
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to Delete By ID
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.account_id,
      },
    });
    if (!commentData) {
      res.status(404).json({ message: "No Comment found with this id!" });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
