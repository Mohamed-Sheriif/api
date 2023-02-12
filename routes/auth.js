const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Register
router.post("/register", async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      hashPassword: req.body.password,
    });

    newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
    const user = await newUser.save();

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ msg: "Wrong credentials!" });
    }

    const validate = await user.comparePassword(password);
    if (!validate) {
      res.status(400).json({ msg: "Wrong credentials!!" });
    }

    const { hashPassword, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "internal server error!" });
  }
});

module.exports = router;
