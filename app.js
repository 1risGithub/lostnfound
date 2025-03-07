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

// Middleware support JSON
app.use(express.json());

// Serve static files from the 'lostnfound' directory
const staticPath = path.join("lostnfound");
app.use(express.static(staticPath));

// Route to serve index.html at the root path "/"
app.get("/", (req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
