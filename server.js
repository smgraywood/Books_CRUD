// require dependencies
const express = require("express");
const logger = require("morgan");
const session = require("express-session");
const passport = require("passport");

// initialize app
const app = express();

const landingRoutes = require("./routes/landing");
const stackRoutes = require("./routes/stacks");
const bookRoutes = require("./routes/books");

// configure app settings
app.set("view engine", "ejs");
require("dotenv").config();
require("./config/database");
require("./config/passport");

// mount middleware
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(
	session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: true,
	})
);
app.use(passport.initialize());
app.use(passport.session());
// below is custom middleware that makes the user variable available in all EJS templates
// if no one is logged in, user will be undefined
app.use(function (req, res, next) {
	res.locals.user = req.user;
	next();
});

// mount routes
app.use("/", landingRoutes);
app.use("/stacks", stackRoutes);
app.use("/books", bookRoutes);

// tell app to listen for requests
app.listen(3000, () => {
	console.log("express is listening on port:3000");
});
