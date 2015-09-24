var AWS = require('aws-sdk');
var fs = require('fs');


AWS.config.loadFromPath('./config.json');


fs.readFile('schema.png', function(err, data){
  if(err){
    throw err;
  }
  var base64data = new Buffer(data, 'binary');

  var s3 = new AWS.S3();

  s3.putObject({
    Bucket : 'biggerbucket',
    Key : 'schema.png',
    Body : base64data
  },  function(resp){
    console.log(arguments);
    console.log('upload Successfully');
  });

});