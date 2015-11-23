'use strict';

var db = require('./lib/db');

var util = require('util');

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');

var app = express();

//For file upload
var uploadBaseUrl = function (req) {
  return util.format('%s://%s:%s/images',
    req.protocol,
    req.hostname,
    app.get ('port'));
};

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', require('./routes/root'));
app.use('/images', require('./routes/images'));

app.use(express.static(path.join(__dirname, 'public'), { index: 'index.html' }));

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
    res.status(err.status || 500).json({
      'error': {
        message: err.message,
        error: err
      }
    });
  });
}

// production error handler
// no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500).json({
      'error': {
        message: err.message,
        error: {}
      }
  });
});


module.exports = app;
