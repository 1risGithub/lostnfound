// routes/posts.js
const express = require("express");
const router = express.Router();
const db = require("../config/database"); // Database connection file

// Fetch all posts
router.get("/", async (req, res) => {
  try {
    const [posts] = await db.query("SELECT * FROM items");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// Fetch post by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [post] = await db.query("SELECT * FROM items WHERE id = ?", [id]);
    if (post.length) {
      res.json(post[0]);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch post details" });
  }
});

module.exports = router;
