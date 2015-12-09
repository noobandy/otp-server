var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var projects = require('./routes/projects');
var otp = require('./routes/otp');




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use("/bower_components", express.static(path.join(__dirname, 'bower_components')));


//auth middleware

var basicAuth = require(path.join(__dirname, "./middlewares/basic-auth"));

var apiAuth = require(path.join(__dirname, "./middlewares/api-auth"));

app.use("/projects",basicAuth);

app.use("/api", apiAuth);

app.use(routes);

app.use(users);

app.use(projects);

app.use('/api', otp);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    if(req.xhr || req.headers.accept.indexOf('json') > -1) {
      res.json({
        message: err.message,
        error: err
      });
    } else {
       res.render('error', {
        message: err.message,
        error: err
      });
    }
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  if(req.xhr || req.headers.accept.indexOf('json') > -1) {
      res.json({
        message: err.message,
        error: {}
      });
    } else {
       res.render('error', {
        message: err.message,
        error: {}
      });
    }
});

var dbConfig = require(path.join(__dirname, "./config/db"))(app);

dbConfig.init();

module.exports = app;
