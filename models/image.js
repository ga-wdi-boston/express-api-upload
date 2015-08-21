'use strict';

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/express-multer');

var imageSchema = new mongoose.Schema ({
  caption: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

var Image = mongoose.model('Image', imageSchema);

module.exports = Image;
