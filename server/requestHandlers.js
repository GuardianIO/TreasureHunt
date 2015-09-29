var express = require('express');
var db = require('./db/index.js')

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

module.exports.createGame = function(req, res){
  console.log('creating game on server for game: ' + req.body.gameName);
  var gameName = req.body.gameName;
  db.createGameName(gameName, function(gameId){
    res.send({gameId: gameId});
  });
}