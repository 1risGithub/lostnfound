const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const compression = require("compression");
require("dotenv").config();

const { PORT } = require("./backend/config/config");
const postRoutes = require("./backend/routes/posts");

const app = express();

const uploadsPath = path.join(__dirname, "backend", "uploads");

app.use(
  "/uploads",
  express.static(uploadsPath, {
    setHeaders: (res, path, stat) => {
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Cache-Control", "no-store");
    },
  })
);

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

// ✅ Routes
app.use("/api/posts", postRoutes);

// ✅ Handle 404 Not Found
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ✅ Global Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// ✅ Start server
app.listen(PORT, () => console.log(`🚀 Server running on port: ${PORT}`));
