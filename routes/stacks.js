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

module.exports = router;
