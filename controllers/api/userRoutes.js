const router = require("express").Router();
const { User } = require("../../models");
const withAuth = require('../../utils/auth');

// Route to Get All
router.get("/", withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      order: [["id", "ASC"]],
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to Get By ID
router.get("/:id", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id);
    if (!userData) {
      res.status(404).json({ message: "No User found with this id!" });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to Create New
router.post("/", withAuth, async (req, res) => {
  try {
    const UserNew = await User.create({
      ...req.body,
      account_id: req.session.account_id,
    });
    res.status(200).json(UserNew);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to Update By ID
router.put("/:id", withAuth, async (req, res) => {
  try {
    const userData = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
      // This get User linked with the login account
      account_id: req.session.account_id,
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to Delete By ID
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id,
        account_id: req.session.account_id,
      },
    });
    if (!userData) {
      res.status(404).json({ message: "No User found with this id!" });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
