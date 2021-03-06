const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	console.log('Serializing USER!');
	done(null, user.id);
});
passport.deserializeUser((id, done) => {
	console.log('Deserializing USER!');
	User.findById(id).then((user) => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback'
		},
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ googleId: profile.id }).then((existingUser) => {
				if (existingUser) {
					console.log('User exists', existingUser);
					done(null, existingUser);
				} else {
					new User({ googleId: profile.id }).save().then((user) => {
						console.log('User created', user);
						done(null, user);
					});
				}
			});
		}
	)
);
