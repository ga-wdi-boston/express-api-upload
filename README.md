![General Assembly Logo](http://i.imgur.com/ke8USTq.png)

# File upload with node, express, and AWS

## Instructions

Fork and clone this repository, then
```bash
$ cd js-express-multer
$ subl .
$ npm install
```
## Objectives

By the end of this lesson, students should be able to:

- Upload files to AWS from a node application
- Write files from a `Buffer` to the file-system.
- Create path names with a low chance of duplication
- Store information about uploaded files in MongoDB via Mongoose
- Upload files from a browser to express and store them in the file-system or AWS.

## Prerequisites

- An `AWS` _(Amazon Web Services)_ account
- [Introduction to ExpressJS](https://github.com/ga-wdi-boston/express-intro08)

## Discussion

What are the parts of file upload?  What are the issues to guard against?

## AWS access control - follow along

Why is this important?

We'll go through the steps necessary to allow authenticated uploads without allowing other access to AWS.

From the `AWS` console open tabs for `IAM` _(Identity and Access Management)_ and `S3` _(Simple Storage Service)_.

In the IAM tab, select `Users` and then the IAM user you want to use for uploads.  Alternatively, you can create and select a new user.  We'll need the `User ARN` _(Amazon Resource Name)_ to grant access to the S3 bucket we'll use for uploads.  We'll also need an `Access Key` _(Access Key Id and Secret Access Key)_ for this IAM User to upload files.

In the S3 tab, create a new bucket for uploads.  Open `Permissions` and click on `Add bucket policy`.  Click on `AWS Policy Generator` at the bottom of the `Bucket Policy Editor` modal.  This will open the AWS Policy Generator page.

On the AWS Policy Generator page, select `S3 Bucket Policy` as the type of policy to generate.  Copy the User ARN from the IAM user page and paste it into the `Principal` text box.  Select `Amazon S3` as the `AWS Service`.  Select `PutObject` and `PutObjectAcl` in the actions multi-select.  Enter `arn:aws:s3:::<bucket_name>/<key_name>` into the `Amazon Resource Name (ARN)` text box. `key_name` is a directory equivalent, we'll use `*`. After all that, click the `Add Statement` button then the `Generate Policy` button.  The `Policy JSON Document` modal that opens contains the bucket policy we'll use (an example follows). Select and copy the JSON then go back to the S3 tab and paste the JSON into the Bucket Policy Editor and click save.

```json
{
  "Version": "2012-10-17",
  "Id": "Policy1439826519004",
  "Statement": [
    {
      "Sid": "Stmt1439826516658",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::<AWS Account Id>:user/<IAM User Name>"
      },
      "Action": [
        "s3:PutObjectAcl",
        "s3:PutObject"
      ],
      "Resource": "arn:aws:s3:::<bucket_name>/<key_name>"
    }
  ]
}
```

With this configuration, we only allow upload access to this the one bucket.

This is one specific way of implementing access control.  AWS provides many different mechanisms to grant and restrict access.

### Uploading files to AWS from node - code along

We'll build a command line script to upload file to AWS.

Why build a command line uploader?

We'll use the following node modules.

- `aws-sdk`
- `crypto`
- `dotenv`
- `file-type`
- `fs`
- `mongoose`

### refactoring - lab

## Uploading files to the file-system - code along

We'll build a command line script to "upload" file to the file-system.

Why build a command line uploader?  What do we have to take care of that AWS handles for us?

We'll use the same node modules but omit `aws-sdk`.

### refactoring - lab

## Uploading files to an echo server from an html form - code along

Using a form with attribute `enctype="multipart/form-data"` to allow uploading of one or files.

We'll use the `FormData` object with jQuery's `$.ajax` function to POST data to an echo server, `http://httpbin.org`.  Later we'll use this front end to POST data to express/multer.

## Uploading files to the file system via multer and express - code along

We'll use the following express modules in addition to the modules from the file-system code along:

- `multer`
- `body-parser`
- `cors`
- `debug`
- `express`
- `morgan`
- `multer`


## Uploading files to AWS via multer and express - lab

We'll need to add `aws-sdk` to the modules we're using.
