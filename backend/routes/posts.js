const express = require("express");
const router = express.Router();
const { getAllPosts, getPostById } = require("../services/postService");

// Fetch all posts
router.get("/", async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// Fetch post by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await getPostById(id);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch post details" });
  }
});

module.exports = router;
