const express = require("express");
const router = express.Router();
const stacksController = require("../controllers/stacks");

// GET /stacks - Index Route
router.get("/", stacksController.index);

// GET /stacks/new - New Stack Route
router.get("/new", stacksController.new);

// POST /stacks - Create Route
router.post("/", stacksController.create);

// GET /stacks/:id - Show Route
router.get("/:id", stacksController.show);

// POST /stacks/:id/books - Add book to stack
router.post("/:id/books", stacksController.addToStack);

// DELETE /stacks/:id - Delete Stack
router.delete("/:id", stacksController.delete);

// DELETE /stacks/:id/books - Delete Book from Stack
router.delete("/:id/books/:bookId", stacksController.deleteBook);

// GET /stacks/:id/edit - Edit Stack Name
router.get("/:id/edit", stacksController.edit);

module.exports = router;
