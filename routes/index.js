const express = require("express");
const router = express.Router();
const passport = require("passport");
const indexController = require("../controllers/index");

router.get("/", indexController.home);

// Google OAuth login route
router.get(
	"/auth/google",
	passport.authenticate("google", {
		// requesting user's profile & email
		scope: ["profile", "email"],
	})
);

// Google OAuth callback route
router.get(
	"/oauth2callback",
	passport.authenticate("google", {
		successRedirect: "/",
		failureRedirect: "/",
	})
);

//OAuth logout route
router.get("/logout", function (req, res) {
	req.logout(function () {
		res.redirect("/");
	});
});

module.exports = router;
