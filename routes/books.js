const express = require("express");
const router = express.Router();
const booksController = require("../controllers/books");
const ensureLoggedIn = require("../config/ensureLoggedIn");

//GET /books/new - new book route
router.get("/new", ensureLoggedIn, booksController.new);

//POST /books - create route
router.post("/", ensureLoggedIn, booksController.create);

//GET /books - index route
router.get("/", ensureLoggedIn, booksController.index);

// GET /books/:id/edit - edit route
router.get("/:id/edit", ensureLoggedIn, booksController.edit);

//POST /books/:id - update route
router.post("/:id", ensureLoggedIn, booksController.updateBook);

//GET /books/:id - show route, must go last
router.get("/:id", ensureLoggedIn, booksController.show);

module.exports = router;
