const connectDb = require("../../db/connect.js");
const mysql = require("mysql");
const tryCatchWrapper = require("../../errors/tryCatchWrapper.js");
const createCustomError = require("../../errors/customError.js");

/**
 * @description Read books
 * @route GET /books
 */
const getBooks = tryCatchWrapper(async (req, res, nex) => {
  const db = connectDb();
  const query = "SELECT * FROM books";
  db.query(query, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (data.length === 0) {
      return res.status(204).json({ message: "empty list" });
    }
    return res.status(200).json({ message: "susscess", data: data });
  });
});

/**
 * @description Read single book
 * @route GET /books/:id
 */
const getSingleBook = tryCatchWrapper(async (req, res, next) => {
  const db = connectDb();
  const { id } = req.params;
  const query = "SELECT * FROM books where id = ?";
  db.query(query, id, (err, data) => {
    if (err) {
      console.log(err);
      return next(createCustomError("Internal server error", 500));
    }
    if (!data) {
      return next(createCustomError("book note found", 404));
    }
    return res.status(200).json({ message: "susscess", data: data });
  });
});

/**
 * @description update book
 * @route PUT /books/:id
 */
const putBook = tryCatchWrapper(async (req, res, next) => {
  const db = connectDb();
  const { id } = req.params;
  const { title, desc, cover, price } = req.body;
  const queryUpdate =
    "UPDATE books SET title = ?, `desc` = ?, cover = ?, price = ? WHERE id = ?";
  if (!title || !desc || !cover || !price) {
    return next(createCustomError("All field are required", 400));
  }
  db.query(queryUpdate, [title, desc, cover, price, id], (err, data) => {
    if (err) {
      console.log(err);
      return next(createCustomError("Internal Server Error", 500));
    }
    return res.status(200).json({ message: "susscess" });
  });
});

/**
 * @description create book
 * @route POST /books
 */
const postBook = tryCatchWrapper(async (req, res, next) => {
  const db = connectDb();
  const query =
    "INSERT INTO books (title, `desc`, cover, price) VALUES (?, ?, ?, ?)";
  const { title, desc, cover, price } = req.body;
  let values = [title, desc, cover, price];
  if (!title || !desc || !cover || !price) {
    return next(createCustomError("All field are required", 400));
  }
  db.query(query, values, (err) => {
    if (err) {
      console.log(err);
      return next(createCustomError("Internal server error", 500));
    }
    return res.status(201).json({ message: "susscess", data: values });
  });
});

/**
 * @description delete book
 * @route DELETE /books/:id
 */
const deleteBook = tryCatchWrapper(async (req, res, next) => {
  const db = connectDb();
  const { id } = req.params;
  if (!id) {
    return next(createCustomError("ID is required", 400));
  }
  const query = "DELETE FROM books WHERE id = ?";
  db.query(query, id, (err, data) => {
    if (err) {
      console.log(err);
      return next(createCustomError("Internal Server Error", 500));
    }
    if (!data) {
      return next(createCustomError("book note found", 404));
    }
    return res.status(200).json({ message: "susscess" });
  });
});
module.exports = { getBooks, getSingleBook, putBook, postBook, deleteBook };
