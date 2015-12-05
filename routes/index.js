var express = require('express');
var router = express.Router();
var path = require("path");
var User = require(path.join(__dirname, "../models/User"));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'OTP-Server' });
});

module.exports = router;
