const connection = require("./database");

async function searchPosts(req, res) {
  const query = req.query.q;
  try {
    const [results] = await connection.query(
      `SELECT * FROM items WHERE name LIKE ? OR description LIKE ?`,
      [`%${query}%`, `%${query}%`]
    );
    res.json(results);
  } catch (err) {
    console.error("🔥 Error searching posts:", err);
    res.status(500).json({ error: "Failed to search posts" });
  }
}

module.exports = { searchPosts };
