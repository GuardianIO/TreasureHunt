var utils = require("./utils.js")

// user progress will be stored in a cookie
// if user does not have cookie process them as a new user
module.exports.checkPlayerStatus = function(req, res, next){
  console.log("Cookies: " + JSON.stringify(req.cookies));
  // if it is user's first time to site, send back cookie with 
  // gameId and roundNumber to track progress
  // initialize roundNumber to 0 for new users
  if(!req.cookie){
    res.cookie('gameId', req.params.gameId);
    res.cookie('roundNumber', 0);
  }
  next();
};

module.exports.sendResponse = function(req, res){
  var gameId = req.params.gameId;
  res.send("Accessing game with id: " + utils.encodeGameUrl({ gameId: gameId }));    
};

module.exports.invitePlayers = function(req, res){
  // get array of email addresses from post request data 
  var inviteeEmails = req.body.inviteeEmailAddresses;

  console.log("attempting to send email from playerHandler");
  utils.invitePlayersViaEmail(inviteeEmails);
  res.end("Invitations sent")
}

module.exports.checkGameCallbacks = [
  exports.checkPlayerStatus,
  exports.sendResponse
];