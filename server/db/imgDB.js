var AWS = require('aws-sdk');
var bucket = 'biggerbucket';



AWS.config.loadFromPath('./server/db/config.json');

module.exports.saveImagePart = function(part, key){
  var s3 = new AWS.S3();
  s3.putObject({
    Bucket : bucket,
    Key : key,
    Body : part,
    ContentLength : part.byteCount
    }, function(err, data){
      if(err) throw err;
      console.log('image upload complete', data);
  });
};
