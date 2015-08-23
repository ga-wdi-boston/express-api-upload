'use strict';

var fs = require('fs');
var Image = require('./models/image.js');

var buffer = fs.readFileSync(process.argv[2]);

var awsUpload = require('./lib/aws-upload.js');

awsUpload(buffer, process.argv[3], function(err, data) {
  if (err) {
    throw err;
  }
  Image.db.close();
  console.log(data);
});
