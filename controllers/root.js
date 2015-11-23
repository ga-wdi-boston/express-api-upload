'use strict';

var index = function index(req, res, next) {
  next();
  // res.json({'index': { title: 'Express' }});
};

module.exports = {
  index
};
