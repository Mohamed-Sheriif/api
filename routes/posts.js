const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

//Create Post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savePost = await newPost.save();
    res.status(200).json(savePost);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

// Update Post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    try {
      if (post.username === req.body.username) {
        const updatedPost = await post.updateOne(
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } else {
        res.status(401).json({ msg: "you can update only your post!" });
      }
    } catch (error) {
      res.status(401).json({ msg: "Internal server error!" });
    }
  } catch (error) {
    res.status(401).json({ msg: "Internal server error!" });
  }
});

// Delete Post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    try {
      if (post.username === req.body.username) {
        await post.deleteOne();
        res.status(200).json({ msg: "Post has been deleted successfully" });
      } else {
        res.status(401).json({ msg: "you can delete only your post!" });
      }
    } catch (error) {
      res.status(401).json({ msg: "Internal server error!" });
    }
  } catch (error) {
    res.status(401).json({ msg: "Internal server error!" });
  }
});

// Get Post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
});

// Get All Posts
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
});

module.exports = router;
