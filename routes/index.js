var express = require('express');
var router = express.Router();
var path = require("path");
var User = require(path.join(__dirname, "../models/User"));
var config = require("config");

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

        if(user === null) {
            return next("route");
        }
        res.render("resetpassword", {username : username, key : key, basePath : config.get("basePath")});

    });
});

router.post('/resetpassword', function(req, res, next) {
    var username = req.body.username;
    var key = req.body.key;
    var password = req.body.password;

    User.findByUsername(username, function(err, user) {
        if(err) return next(err);

        if(user === null) {
            return next("route");
        }

        user.resetPassword(key, password, function(err, changed) {
            if(err) return next(err);

            if(changed) {
                res.redirect("/");
            } else {
                res.render("resetpassword", {
                    username : username,
                    key : key,
                    basePath : config.get("basePath"),
                    hasErrors : true});
            }

        });
    });
});

module.exports = router;
