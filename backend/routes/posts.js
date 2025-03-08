const express = require("express");
const router = express.Router();
const pool = require("../config/database");
const multer = require("multer");
const path = require("path");

// ==========================
// BASE_URL (Auto-Select)
// ==========================
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://githublostnfound-production.up.railway.app"
    : "http://localhost:4000";

// ==========================
// Multer Storage Setup
// ==========================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ==========================
// Create new post (with image)
// ==========================
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, description, location, post_by } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const [result] = await pool.query(
      "INSERT INTO items (name, image, description, location, post_by) VALUES (?, ?, ?, ?, ?)",
      [name, imagePath, description, location, post_by]
    );

    res.status(201).json({
      id: result.insertId,
      message: "Post created successfully",
    });
  } catch (err) {
    console.error("🔥 Error creating post:", err.message);
    res.status(500).json({ error: "Failed to create post" });
  }
});

// ==========================
// Get all posts
// ==========================
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
    console.error("🔥 Error fetching posts:", err.message);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// ==========================
// Get post by ID
// ==========================
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [post] = await pool.query(
      "SELECT id, name, image, description, location, post_by, created_at FROM items WHERE id = ?",
      [id]
    );

    if (post.length) {
      if (post[0].image) {
        post[0].image = `${BASE_URL}${post[0].image}`;
      }
      res.json(post[0]);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (err) {
    console.error("🔥 Error fetching post:", err.message);
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

module.exports = router;
