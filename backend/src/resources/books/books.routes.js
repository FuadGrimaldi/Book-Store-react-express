const express = require("express");
const router = express.Router();
const bookController = require("./books.controller");

// routes
router.get("/", bookController.getBooks);
router.post("/", bookController.postBook);
router.get("/:id", bookController.getSingleBook);
router.put("/:id", bookController.putBook);
router.delete("/:id", bookController.deleteBook);

module.exports = router;
