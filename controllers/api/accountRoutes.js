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

// Route to Get Each
router.get('/:id', async (req, res) => {
  try {
    const accountData = await Account.findByPk(req.params.id);
    if (!accountData) {
      res.status(404).json({ message: 'No Account found with this id!' });
      return;
    }
    res.status(200).json(accountData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to Compare and Check (login function)
router.post("/login", async (req, res) => {
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
      // Session ID here set to be same as account ID
      req.session.account_id = accountData.id;
      req.session.logged_in = true;
      res.json({ account: accountData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to logout
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Route to Create new account (sign up function)
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

// Route to Delete By ID
router.delete("/:id", async (req, res) => {
  try {
    const accountData = await Account.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!accountData) {
      res.status(404).json({ message: "No Account found with this id!" });
      return;
    }
    res.status(200).json(accountData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Route to Update Password By ID
// router.put("/:id", async (req, res) => {
//   try {
//     const accountData = await Account.update(req.body, {
//       where: {
//         id: req.params.id,
//       },
//       // This get Account linked with the login account
//       // user_id: req.session.account_id,
//     });
//     res.status(200).json(accountData);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });


module.exports = router;
