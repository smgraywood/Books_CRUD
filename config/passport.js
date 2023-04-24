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
				// A user has logged in with OAuth...
				let user = await User.findOne({ googleId: profile.id });
				// If an existing user was found, provide it to passport
				if (user) return cb(null, user);

				// If it's a new user, we must create it & then provide it to passport
				user = await User.create({
					name: profile.displayName,
					googleId: profile.id,
					email: profile.emails[0].value,
					avatar: profile.photos[0].value,
				});
				return cb(null, user);
			} catch (error) {
				return cb(error);
			}
		}
	)
);

passport.serializeUser(function (user, cb) {
	cb(null, user._id);
});

passport.deserializeUser(async function (userId, cb) {
	cb(null, await User.findById(userId));
});
