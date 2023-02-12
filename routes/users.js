const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

// Update
router.put("/:id", async (req, res) => {
  if (req.body.userId == req.params.id) {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    try {
      const updatedUsr = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json(updatedUsr);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  } else {
    res.status(401).json({ msg: "you can only update your account!" });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      console.log("user");
      const user = await User.findById(req.params.id);
      console.log("found user");

      try {
        console.log("delete post");
        await Post.deleteMany({ username: user.username });
        console.log("delete post");

        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({ msg: "User has been deleted successfully" });
      } catch (error) {
        console.log(error);
        res.status(500).send(error);
      }
    } catch (error) {}
  } else {
    res.status(401).json({ msg: "you can only delete your account!" });
  }
});

// Get User
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { hashPassword, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
});

module.exports = router;
