const express = require("express");
const pool = require("./database");
const router = express.Router();

const postsRoutes = require("./posts");
const contactRoutes = require("./contact");
const reportsRoutes = require("./reports");
const { searchPosts } = require("./controllers");

// Example API endpoint at "/api"
router.get("/", (req, res) => {
  res.send("API is running!");
});

router.get("/posts", async (req, res) => {
  try {
    const [results] = await pool.query("SELECT * FROM posts");
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.use("/posts", postsRoutes);
router.use("/reports", reportsRoutes);
router.use("/contact", contactRoutes);
router.get("/search", searchPosts);

module.exports = router;
