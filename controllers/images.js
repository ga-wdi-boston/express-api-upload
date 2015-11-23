'use strict';

var Image = require('../models/image.js');

var index = function index(req, res, next) {
  Image.find({}, {__v: 0}).exec().then(function(images) {
    res.json(images);
  }).catch(function(error) {
    next(error);
  });
};

var create = function create(req, res, next) {
  res.json({body: req.body, file: req.file});
};

module.exports = {
  index,
  create
};
