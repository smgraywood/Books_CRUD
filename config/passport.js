const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("../models/user");

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_SECRET,
			callbackURL: process.env.GOOGLE_CALLBACK,
		},
		async function (accessToken, refreshToken, profile, cb) {
			try {
				//a user has logged in with OAuth...
				let user = await User.findOne({ googleId: profile.id });
				//if an existing user was found, provide it to passport
				if (user) return cb(null, user);

				//if it's a new user, we must create it & then provide it to passport
				user = await User.create({
					name: profile.displayName,
					googleId: profile.id,
					email: profile.emails[0].value,
					avatar: profile.photos[0].value,
					stacks: [],
					books: [],
				});
				return cb(null, user);
			} catch (error) {
				return cb(error);
			}
		}
	)
);

//adds data to the session that will be used to track the user
passport.serializeUser(function (user, cb) {
	cb(null, user._id);
});

//updates req.user object every time a request comes in from a logged in user
passport.deserializeUser(async function (userId, cb) {
	cb(null, await User.findById(userId));
});
