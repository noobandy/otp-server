var express = require('express');
var router = express.Router();
var path = require("path");
var User = require(path.join(__dirname, "../models/User"));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'OTP-Server' });
});

router.get('/verifyemail/:username/:key', function(req, res, next) {
    var username = req.params.username;
    var key = req.params.key;

    User.findByUsername(username, function(err, user) {
        if(err) return next(err);
        user.verifyEmailId(key, function(err, verified) {
            if(err) return next(err);
            res.redirect("/");
        });
    });
});

router.get('/resetpassword/:username/:key', function(req, res, next) {
    var username = req.params.username;
    var key = req.params.key;

    User.findByUsername(username, function(err, user) {
        if(err) return next(err);
        user.verifyEmailId(key, function(err, verified) {
            if(err) return next(err);
            res.redirect("/");
        });
    });
});


module.exports = router;
