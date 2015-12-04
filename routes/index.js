var express = require('express');
var router = express.Router();
var path = require("path");
var User = require(path.join(__dirname, "../models/User"));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'OTP-Server' });
});

router.get('/verifyemail', function(req, res, next) {
	var username = req.query.username;
	var key = req.query.key;

	User.findByUsername(username, function(err, user) {
		if(err) return next(err);
		user.verifyEmailId(key, function(err, verified) {
			if(err) return next(err);
			res.render('index', { title: 'OTP-Server', emailIdVerified : emailIdVerified});
		});
	});
});

router.get('/resetpassword', function(req, res, next) {
  res.render('index', { title: 'OTP-Server' });
});

module.exports = router;
