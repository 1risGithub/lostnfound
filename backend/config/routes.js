const express = require("express");
const pool = require("../config/database");
const router = express.Router();

const postsRouter = require("../routes/posts.js");
const contactRoutes = require("../routes/contact.js");
const reportsRoutes = require("../routes/reports.js");
const { searchPosts } = require("../routes/controllers.js");

// Example API endpoint at "/api"
router.get("/", (req, res) => {
  res.send("API is running!");
});

// Get all posts
router.get("/", async (req, res) => {
  try {
    const [posts] = await pool.query(
      "SELECT id, name, image, description, location, post_by, created_at FROM items ORDER BY created_at DESC"
    );

    posts.forEach((post) => {
      if (post.image) {
        post.image = `${BASE_URL}${post.image}`;
      }
    });

    console.log("✅ Posts:", posts);
    res.json(posts);
  } catch (err) {
    console.error("🔥 Error fetching posts:", err); // Log the error stack
    res
      .status(500)
      .json({ error: "Failed to fetch posts", details: err.message });
  }
});

router.get("/posts", async (req, res) => {
  try {
    const [results] = await pool.query("SELECT * FROM posts");
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Attach postsRouter to the "/posts" endpoint
router.use("/posts", postsRouter);

module.exports = function (app) {
  app.use("/api/posts", postsRouter);
  app.use("/api/contact", contactRoutes);
  app.use("/api/reports", reportsRoutes);
  // Add more routes as necessary
};

module.exports = router;
