var express = require('express');

module.exports.downloadHandler = function(req, res){
  res.download('./server/testDownload.txt', function(err){
    if(err){
      res.end("Download failed");
    }
    else {      
      res.end("Download successful")
    }
  });
  // res.end("Download requested for url " + req.params.url);
};

module.exports.uploadHandler = function(req, res){
  res.end("Uploading file ");
};