var utils = require("./utils.js");
var db = require('./db/db.js');

module.exports = {
  checkGame:function(req, res, next){
    console.log(req.url);
    db.getSingleGame(req.url.split('/')[1], function(results){
      if(results){
        res.send('game exists');
      }
    });
    next();
  },
  // user progress will be stored in a cookie
  // if user does not have cookie process them as a new user
  checkPlayerStatus : function(req, res, next){
    console.log("Cookies: " + JSON.stringify(req.cookies));
    // if it is user's first time to site, send back cookie with 
    // gameId and roundNumber to track progress
    // initialize roundNumber to 0 for new users
    if(!req.cookie){
      res.cookie('gameId', req.params.gameId);
      res.cookie('roundNumber', 0);
    }
    next();
  },

  sendResponse : function(req, res){
    var gameId = req.params.gameId;
    res.send("Accessing game with id: " + utils.encodeGameUrl({ gameId: gameId }));    
  },

  invitePlayers : function(req, res){
    // get array of email addresses from post request data 
    var inviteeEmails = req.body.inviteeEmailAddresses;
    var gameId = req.body.gameId;

    console.log("attempting to send email from playerHandler");
    utils.invitePlayersViaEmail(inviteeEmails, gameId);
    res.end("Invitations sent")
  },

};

module.exports.checkGameCallbacks = [
    module.exports.checkGame,
    module.exports.checkPlayerStatus,
    module.exports.sendResponse
]