var express = require('express');
var jwt =  require('jwt-simple');
var db = require('./db/db.js');
var imgDB = require('./db/imgDB.js');
var multiparty = require('multiparty');
var bucket = 'biggerbucket';
var s3url = "https://s3-us-west-1.amazonaws.com/biggerbucket/";

var _secret = 'BiGaCoRn';

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
  });

  form.on('part', function(part){
    var imgKey = Date.now() + '.png';
    params.imgKey = s3url + imgKey;
    db.createNodeInfo(params);
    imgDB.saveImagePart(part, imgKey, function(data){
      res.send(data);
    });
  });
  form.parse(req);  
};

module.exports.createGame = function(req, res){
  console.log('creating game on server, private: ', req.body.private);
  var private = req.body.private || false;
  var gameName = req.body.gameName;
  var gameDescription = req.body.gameDescription;
  if(req.body.token){
    var userName = jwt.decode(req.body.token, _secret);
  }
  userName = userName || 'anon'
  db.createGame({gameName: gameName, description: gameDescription, userName: userName, private: private}, function(gameId){
    res.send({gameId: gameId});
  });
};

module.exports.getAllGames = function(req, res){
  if(req.body.token){
    var creator = jwt.decode(req.body.token, _secret);
  }
  db.showGames(function(results){
    res.send(results);
  }, creator);
};

module.exports.getGame = function(req, res){
  db.getGameInfo(req.body.gameId, function(err, results){
    if(err){
      res.sendStatus(500);
    }
    res.send(results);
  })
};

<<<<<<< Updated upstream
module.exports.getNodePics = function(req, res){
  var params = {};
  params.gameId = req.body.gameId;
  params.nodeId = req.body.nodeId;
  db.getNodePics(params, function(results){
    res.send(results);
  });
};

module.exports.postNodePic = function(req, res){
  var form = new multiparty.Form();
  var params = {};
  form.on('field', function(name, value){

    var picData = JSON.parse(value);
    params.gameId = picData.gameId;
    params.nodeId = picData.nodeId;
    params.comment = picData.comment;
    params.userName = jwt.decode(picData.token, _secret);
  });

  form.on('part', function(part){
    var today = Date.now();
    var imgKey = today + '.png';
    params.image = s3url + imgKey;
    params.time = today;
    db.postNodePic(params);
    imgDB.saveImagePart(part, imgKey, function(data){
      res.send(data);
    });
  });

  // form.on('close', function(){
  //   res.send("Uploading file ");
  // });
  form.parse(req);  
};

module.exports.getGameInfo = function(req, res){
  // console.log('getGameInfo', req);
  db.getGameIntro(req.body.gameId, function(results){
    // console.log('results',results);
    res.send(results);
  })
};

module.exports.sendScore = function(req, res){
  db.sendScore(req.body, function(results){
    console.log('sendScore',results);
    res.send(results);
  });
};

module.exports.updateGame = function(req, res){
  console.log('update game gameID: ',req.body.gameId);
  console.log('game nodes: ',req.body.nodes);
  db.updateGame(req.body, function(results){
    res.send(results)
  });
};



