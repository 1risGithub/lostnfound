const connection = require("../config/database");

const getAllPosts = async () => {
  const [posts] = await connection.query("SELECT * FROM items");
  return posts;
};

const getPostById = async (id) => {
  const [post] = await connection.query("SELECT * FROM items WHERE id = ?", [
    id,
  ]);
  return post[0];
};

module.exports = {
  getAllPosts,
  getPostById,
};
