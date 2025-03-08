const express = require("express");
const connection = require("./database");

const router = express.Router();

// Example API endpoint at "/api"
router.get("/", (req, res) => {
  res.send("API is running!");
});

module.exports = router;
