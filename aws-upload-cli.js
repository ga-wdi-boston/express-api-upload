'use strict';

var fs = require('fs');

var awsUpload = require('./lib/aws-upload.js');

var logResult = function(err, data) {
  if (err) {
    console.error(err);
  } else {
    console.log(data);
  }
};

for (var i = 2; i < process.argv.length; i++) {
  var buffer = fs.readFileSync(process.argv[i]);
  awsUpload(buffer, logResult);
}

