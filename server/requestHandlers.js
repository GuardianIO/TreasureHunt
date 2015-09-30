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

  form.on('field', function(name, value){
    console.log('name',name);
    console.log('value', value);
  });

  form.on('part', function(part){
    var imgKey = Date.now() + '.png';
    imgDB.saveImagePart(part, imgKey);
  });

  form.parse(req);
 
  console.log('got to uploadHandler')
  res.send("Uploading file ");
};

module.exports.gameHandler = function(req, res){
  console.log("Cookies: " + req.cookie);
  if(!req.cookie){
    res.cookie('gameId', req.params.gameId);
    res.cookie('roundNumber', 0);
  }
  res.send("Accessing game with id: " + req.params.gameId);  
};

module.exports.createGame = function(req, res){
  console.log('creating game on server for game: ' + req.body.gameName);
  var gameName = req.body.gameName;
  db.createGameName(gameName, function(gameId){
    res.send({gameId: gameId});
  });
}