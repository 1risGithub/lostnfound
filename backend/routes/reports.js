const express = require("express");
const router = express.Router();
const pool = require("../config/database");

// 👉 ALL
router.get("/", async (req, res) => {
  try {
    const [posts] = await pool.query(
      "SELECT * FROM items ORDER BY created_at DESC"
    );
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// 👉 ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [post] = await pool.query("SELECT * FROM items WHERE id = ?", [id]);
    if (post.length) {
      res.json(post[0]);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

module.exports = router;
