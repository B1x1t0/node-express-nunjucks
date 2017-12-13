var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');

var nunjucks = require('nunjucks');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true,
  noCache: true
});

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve('./public')));

// Nos permite utilizar la url de public desde cualquier ruta, y asi poder
// importar los ficheros desde alli. 
app.use("/public", express.static(path.join(__dirname, 'public')));

app.use('/', index);

//middleware
app.use(function (req, res, next) {
  next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;