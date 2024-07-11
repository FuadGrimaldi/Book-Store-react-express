const connectDb = require("../../db/connect.js");
const mysql = require("mysql");
/**
 * @description Read books
 * @route GET /books
 */

const getBooks = (req, res) => {
  const db = connectDb();
  const query = "SELECT * FROM books";
  db.query(query, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (data.length === 0) {
      return res.status(204).json({ message: "empty list" });
    }
    return res.status(200).json(data);
  });
};

module.exports = { getBooks };
