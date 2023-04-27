const express = require("express");
const router = express.Router();
const stacksController = require("../controllers/stacks");
const ensureLoggedIn = require("../config/ensureLoggedIn");

// GET /stacks - Index Route
router.get("/", ensureLoggedIn, stacksController.index);

// GET /stacks/new - New Stack Route
router.get("/new", ensureLoggedIn, stacksController.new);

// POST /stacks - Create Route
router.post("/", ensureLoggedIn, stacksController.create);

// GET /stacks/:id - Show Route
router.get("/:id", ensureLoggedIn, stacksController.show);

// POST /stacks/:id/books - Add book to stack
router.post("/:id/books", ensureLoggedIn, stacksController.addToStack);

// DELETE /stacks/:id - Delete Stack
router.delete("/:id", ensureLoggedIn, stacksController.delete);

// DELETE /stacks/:id/books - Delete Book from Stack
router.delete(
	"/:id/books/:bookId",
	ensureLoggedIn,
	stacksController.deleteBook
);

// GET /stacks/:id/edit - Edit Stack Name
router.get("/:id/edit", ensureLoggedIn, stacksController.edit);

// POST /stacks/:id - Show Route for updated stack
router.post("/:id", ensureLoggedIn, stacksController.updateStack);

module.exports = router;
