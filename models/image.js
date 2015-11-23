'use strict';

var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  mime: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true
  }
});

var Image = mongoose.model('Image', imageSchema);

module.exports = Image;
