'use strict';

var bucket = process.env.AWS_S3_BUCKET ||
 require('dotenv').load() && process.env.AWS_S3_BUCKET;

var crypto = require('crypto');
var getFileType = require('file-type');

var AWS = require('aws-sdk');
var awsBucket = new AWS.S3();

var awsUpload = function(buffer, callback) {
  var filename = crypto.pseudoRandomBytes(16).toString('hex');
  var fileType = getFileType(buffer);

  if (!fileType) {
    fileType = {
      ext: 'bin',
      mime: 'application/octet-stream'
    };
  }

  var key =
    (new Date()).toISOString().split('T')[0] +
    '/' + filename +
    '.' + fileType.ext;

  var params = {
    ACL: 'public-read',
    Bucket: bucket,
    Key: key,
    ContentType: fileType.mime,
    Body: buffer
  };

  awsBucket.upload(params).send(callback);
};

module.exports = awsUpload;
