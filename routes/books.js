const express = require("express");
const router = express.Router();
const booksController = require("../controllers/books");

//GET /books/new - new book route
router.get("/new", booksController.new);

//POST /books - create route
router.post("/", booksController.create);

//GET /books - index route
router.get("/", booksController.index);

// GET /books/:id/edit - edit route
router.get("/:id/edit", booksController.edit);

//POST /books/:id - update route
router.post("/:id", booksController.updateBook);

//GET /books/:id - show route, must go last
router.get("/:id", booksController.show);

module.exports = router;
