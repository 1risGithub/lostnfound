const express = require("express");
const mysql = require("mysql2");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to database using Environment Variables from Railway
const db = mysql.createPool({
  uri:
    process.env.MYSQL_URL ||
    "mysql://root:cSKvpWezJyVavIilvFdEpQalLALHCxud@nozomi.proxy.rlwy.net:34300/railway",
});

// Middleware to support JSON parsing
app.use(express.json());

// Serve static files from the "frontend" directory
app.use(express.static(path.join(__dirname, "frontend")));

// Route to serve index.html when accessing the root URL
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
