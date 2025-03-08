const express = require("express");
const connection = require("./database");

const router = express.Router();

const postsRoutes = require("../api/posts");

// Example API endpoint at "/api"
router.get("/", (req, res) => {
  res.send("API is running!");
});

// Fetch all posts
router.get("/posts", (req, res) => {
  const query = "SELECT * FROM posts";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Path for `/api/posts`
router.use("/posts", postsRoutes);

module.exports = router;
