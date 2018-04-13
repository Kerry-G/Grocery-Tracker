var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
var receiptsRouter = require('./routes/receipts');

var app = express();
app.use(cors());
// load mongoose package
var mongoose = require('mongoose');

// Use native Node promises
mongoose.Promise = global.Promise;

// connect to MongoDB
let dev = 'mongodb://192.168.2.24:27017/grocery-tracker';
let prod = 'mongodb://127.0.0.1:8080/grocery-tracker'
let ip = process.env.NODE_ENV === 'production' ? prod : dev
mongoose.connect(ip)
  .then(() =>  console.log('Mongo connection succesful'))
  .catch((err) => console.error(err));

// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'static/build')));

app.use('/receipts', receiptsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err)
});

module.exports = app;
