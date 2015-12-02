var express = require('express'),
	router = express.Router(),
	path = require("path"),
	User = require(path.join(__dirname, "../models/User"));


router.post('/users', function(req, res, next) {
	var user = new User(req.body);

	user.save(function(err, user) {
		if(err) return next(err);

		res.json(user);
	});
});


router.get("/users/{username}", function(req, res, next) {
	User.findByUsername(function(err, user) {
		if(err) return next(err);

		if(user === null) {
			return next("route");
		}
		
		res.json(user);
	});
});


router.post("/users/{username}/changepassword", function(req, res, next) {
	User.findByUsername(req.params.username, function(err, user) {
		if(err) return next(err);

		if(user !== null) {
			user.changePassword(req.body.oldPassoword, req.body.newPassword, function(err, changed) {
				if(err) return next(err);

				res.json({success : changed});

			});
		}
	});
});

router.post("/users/{username}/checkpassword", function(req, res, next) {
	User.findByUsername(req.params.username, function(err, user) {
		if(err) return next(err);

		if(user !== null) {
			user.checkPassword(req.body.password, function(err, matched) {
				if(err) return next(err);

				res.json({success : matched});

			});
		}
	});
});

module.exports = router;
