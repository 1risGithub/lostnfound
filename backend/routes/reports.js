const express = require("express");
const router = express.Router();
const pool = require("../config/database");

// ==========================
// BASE_URL (Auto-Select)
// ==========================
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://githublostnfound-production.up.railway.app"
    : "http://localhost:4000";

// ==========================
// Get all reports
// ==========================
router.get("/", async (req, res) => {
  try {
    const [reports] = await pool.query(
      "SELECT id, name, image, description, location, post_by, created_at FROM items ORDER BY created_at DESC"
    );

    reports.forEach((report) => {
      if (report.image) {
        report.image = `${BASE_URL}${report.image}`;
      }
    });

    console.log("✅ Reports:", reports);
    res.json(reports);
  } catch (err) {
    console.error("🔥 Error fetching reports:", err.message);
    res.status(500).json({ error: "Failed to fetch reports" });
  }
});

// ==========================
// Get report by ID
// ==========================
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [report] = await pool.query(
      "SELECT id, name, image, description, location, post_by, created_at FROM items WHERE id = ?",
      [id]
    );

    if (report.length) {
      if (report[0].image) {
        report[0].image = `${BASE_URL}${report[0].image}`;
      }
      res.json(report[0]);
    } else {
      res.status(404).json({ error: "Report not found" });
    }
  } catch (err) {
    console.error("🔥 Error fetching report:", err.message);
    res.status(500).json({ error: "Failed to fetch report" });
  }
});

module.exports = router;
