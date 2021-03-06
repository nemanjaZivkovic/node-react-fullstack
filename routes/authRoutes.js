const passport = require('passport');

module.exports = (app) => {
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: [ 'profile', 'email' ]
		})
	);

	app.get('/auth/google/callback', passport.authenticate('google'));

	app.get('/api/logout', (req, res) => {
		// passport also attaches logout to the req object
		req.logout();
		res.send(req.user);
	});

	app.get('/api/current_user', (req, res) => {
		// passport attaches user to the req object
		res.send(req.user);
		//res.send(req.session);
	});

	
};
