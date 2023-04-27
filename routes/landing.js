const express = require("express");
const router = express.Router();
const passport = require("passport");
const landingController = require("../controllers/landing");

//GET / - landing page where user can begin login process
router.get("/", landingController.home);

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
		//if user logs in, the stacks index page is rendered
		successRedirect: "/stacks",
		//if user cannot log in, an error page is rendered
		failureRedirect: "/error",
	})
);

//OAuth logout route
router.get("/logout", function (req, res) {
	req.logout(function () {
		//upon log out, the landing page renders
		res.redirect("/");
	});
});

module.exports = router;
