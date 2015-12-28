var express = require('express'),
	router = express.Router(),
	path = require("path"),
	User = require(path.join(__dirname, "../models/User")),
	randomKeyGenerator = require(path.join(__dirname, "../models/RandomKeyGenerator")),
	emailHelper = require(path.join(__dirname, "../models/EmailHelper"));


router.post('/users', function(req, res, next) {
	var user = new User(req.body);

	user.emailIdVerified = false;
	user.emailIdVerificationKey = randomKeyGenerator(32);


	user.save(function(err, user) {
		if(err) return next(err);
		emailHelper.sendVerificationEmail(user.emailId, user.username, user.emailIdVerificationKey);
		res.json({success : true});
	});
});


router.get("/users/:username", function(req, res, next) {
	User.findByUsername(function(err, user) {
		if(err) return next(err);

		if(user === null) {
			return next("route");
		}
		
		res.json(user);
	});
});


router.post("/users/:username/changepassword", function(req, res, next) {
	User.findByUsername(req.params.username, function(err, user) {
		if(err) return next(err);
		if(user !== null) {
			user.changePassword(req.body.oldPassword, req.body.newPassword, function(err, changed) {
				if(err) return next(err);
				res.json({success : changed});
			});
		} else {
			next("route");
		}
	});
});

router.post("/users/:username/checkpassword", function(req, res, next) {
	User.findByUsername(req.params.username, function(err, user) {
		if(err) return next(err);

		if(user !== null) {
			user.checkPassword(req.body.password, function(err, matched) {
				if(err) return next(err);
				res.json({success : matched});

			});
		} else {
			next("route");
		}
	});
});

router.post("/users/:username/forgotpassword", function(req, res, next) {
	var username = req.params.username;

	User.findByUsername(username, function(err, user) {
		if(err) return next(err);
		user.passwordResetKey = randomKeyGenerator(16);
		
		emailHelper.sendPasswordResetEmail(user.emailId, username, user.passwordResetKey );

		user.save(function(err, user) {
			if(err) return next(err);

			res.json({success : true});

		});
	});
});

router.post("/users/:username/resetpassword", function(req, res, next) {
	var username = req.params.username;
	var key = req.body.key;
	var newPassword = req.body.newPassword;

	User.findByUsername(username, function(err, user) {
		if(err) return next(err);
		user.resetPassword(key, newPassword, function(err, changed) {
			if(err) return next(err);

			res.json({success : changed});

		});
	});
});


module.exports = router;
