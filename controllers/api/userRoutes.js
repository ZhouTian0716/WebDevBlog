const router = require("express").Router();
const { User } = require("../../models");

// The `/api/users` endpoint
router.get("/", async (req, res) => {
  try {
    const beneficiaryData = await Beneficiary.findAll({});
    res.status(200).json(beneficiaryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// This new route for update user info on section 1
router.put("/:id", async (req, res) => {
  try {
    const userData = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/data/:id", async (req, res) => {
  try {
    const userInfo = await User.findByPk(req.params.id, {
      include: [
        {
          model: Asset,
        },
        {
          model: Beneficiary,
        },
        {
          model: Executor,
        },
        {
          model: Witness,
        },
        {
          model: AssetApportion,
        },
      ],
    });

    const user = userInfo.get({ plain: true });

    if (!user) {
      res.status(404).send("Record not found!");
      return;
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
