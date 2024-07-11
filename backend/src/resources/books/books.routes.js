const express = require("express");
const router = express.Router();
const bookController = require("./books.controller");

router.get("/", bookController.getBooks);

module.exports = router;
