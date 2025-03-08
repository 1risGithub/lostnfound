const express = require("express");
const router = express.Router();
const pool = require("../config/database");
const multer = require("multer");
const path = require("path");

// ==========================
// ✅ Multer Storage Setup
// ==========================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); // เก็บไฟล์ที่โฟลเดอร์ backend/uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // ตั้งชื่อไฟล์เป็น timestamp
  },
});

const upload = multer({ storage });

// ==========================
// ✅ 1. Create new post (with image)
// ==========================
router.post("/", upload.single("image"), async (req, res) => {
  const { name, description, location, post_by } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const [result] = await pool.query(
      "INSERT INTO items (name, image, description, location, post_by) VALUES (?, ?, ?, ?, ?)",
      [name, imagePath, description, location, post_by]
    );
    res
      .status(201)
      .json({ id: result.insertId, message: "Post created successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to create post" });
  }
});

// ==========================
// ✅ 2. Get all posts
// ==========================
router.get("/", async (req, res) => {
  try {
    const [posts] = await pool.query(
      "SELECT * FROM items ORDER BY created_at DESC"
    );

    console.log("✅ Posts:", posts);
    res.json(posts);
  } catch (err) {
    console.error("🔥 Error fetching posts:", err.message);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// ==========================
// ✅ 3. Get post by ID
// ==========================
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [post] = await pool.query("SELECT * FROM items WHERE id = ?", [id]);
    if (post.length) {
      if (post[0].image) {
        post[0].image = `http://localhost:4000${post[0].image}`;
      }
      res.json(post[0]);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

module.exports = router;
