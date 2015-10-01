var express = require('express');
var db = require('./db/index.js');
var imgDB = require('./db/imgDB.js');
var multiparty = require('multiparty');
var bucket = 'biggerbucket';

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
  var form = new multiparty.Form();
  var params = {};
  var longitude;
  var latitude;
  var gameId;

  form.on('field', function(name, value){
    var nodeData = JSON.parse(value);
    params.gameId = nodeData.gameId
    params.longitude = nodeData.longitude;
    params.latitude = nodeData.latitude;
    params.clue = nodeData.clue;
    // console.log(gameId, longitude, latitude);
  });

  form.on('part', function(part){
    var imgKey = Date.now() + '.png';
    params.imgKey = imgKey;
    db.createNodeInfo(params);
    imgDB.saveImagePart(part, imgKey);
  });

  form.parse(req);
 
  console.log('got to uploadHandler')
  res.send("Uploading file ");
};

module.exports.createGame = function(req, res){
  console.log('creating game on server for game: ' + req.body.gameName);
  var gameName = req.body.gameName;
  var gameDescription = req.body.gameDescription;

  db.createGameName({gameName: gameName, description: gameDescription}, function(gameId){
    res.send({gameId: gameId});
  });
};

module.exports.getAllGames = function(req, res){
  db.showGames(function(results){
    res.send(results);
  });
};