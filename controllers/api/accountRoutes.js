const router = require("express").Router();
const { Account } = require("../../models");

// Route to Get All
router.get("/", async (req, res) => {
  try {
    const accountData = await Account.findAll({
      order: [["id", "ASC"]],
    });
    res.status(200).json(accountData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to Compare and Check
router.post("/", async (req, res) => {
  try {
    const accountData = await Account.findOne({
      where: { email: req.body.email },
    });

    if (!accountData) {
      res.status(400).json({ message: "Login failed. Please try again" });
      return;
    }

    const validPassword = await accountData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Login failed. Please try again" });
      return;
    }

    req.session.save(() => {
      req.session.account_id = accountData.id;
      req.session.logged_in = true;
      // console.log(req.session.account_id);
      // console.log(req.session.logged_in);
      res.json({ account: accountData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to logout
router.get("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Route to Create new
router.post('/', async (req, res) => {
  try {
    const accountData = await Account.create(req.body);

    req.session.save(() => {
      req.session.user_id = accountData.id;
      req.session.logged_in = true;

      res.status(200).json(accountData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
