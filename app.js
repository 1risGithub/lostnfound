const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
require("dotenv").config();

const { PORT, CORS_OPTIONS } = require("./backend/config/config");
const postRoutes = require("./backend/routes/posts");

const app = express();

// ✅ Middleware
app.use(cors(CORS_OPTIONS));
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
