const express = require("express");
const connection = require("./database");
const router = express.Router();

const postsRoutes = require("../routes/posts");
const contactRoutes = require("../routes/contact");
const reportsRoutes = require("../routes/reports");
const { searchPosts } = require("../routes/controllers");

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
// Path for `/api/reposts`
router.use("/reports", reportsRoutes);
// Path for `/api/contact/:id`
router.use("/contact", contactRoutes);
// Path for `Search API`
router.get("/api/search", searchPosts);

module.exports = router;
