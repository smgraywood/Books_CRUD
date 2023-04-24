const express = require("express");
const router = express.Router();
const passport = require("passport");

const landingController = require('../controllers/landing');

router.get('/', landingController.home);

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
		successRedirect: "/index",
		failureRedirect: "/error",
	})
);

//OAuth logout route
router.get("/logout", function (req, res) {
	req.logout(function () {
		res.redirect("/");
	});
});

module.exports = router;
