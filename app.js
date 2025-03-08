const express = require("express");
const cors = require("cors");
const path = require("path");
const routes = require("./backend/config/routes");
const connection = require("./backend/config/database");

const app = express();

// 1. Middleware
app.use(cors());
app.use(express.json());

// 2. Serve static files from frontend
app.use(
  express.static(path.join(__dirname, "frontend"), {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css");
      }
    },
  })
);

// 3. Serve static files from root directory
app.use(express.static(__dirname));

// 4. Serve index.html at the root path "/"
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 5. Example API endpoint at "/API/posts"
app.get("/API/posts", (req, res) => {
  const query = "SELECT * FROM items";

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching posts:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(results);
  });
});

// 6. Use routes for "/api"
app.use("/api", routes);

// 7. Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port: ${PORT}`);
});
