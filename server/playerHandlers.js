var utils = require("./utils.js");
var db = require('./db/db.js');

module.exports = {
  checkGame:function(req, res, next){
    // console.log('url', req.url);
    db.getSingleGame(req.url.split('/')[1], function(err, results){
      if(err){
        res.send(500);
      }else{
        res.send(results);
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
    // if(!req.cookies.jim){
    //   res.cookie('jim', {cool:'yep, he is cool'})
    // }else{
    //   res.cookie('jim', {cool:"totallyBadass"});
    // }
    
    next();
  },

  // sendResponse : function(req, res){
  //   var gameId = req.params.gameId;
  //   res.send("Accessing game with id: " + utils.encodeGameUrl({ gameId: gameId }));    
  // },

  invitePlayers : function(req, res){
    // get array of email addresses from post request data 
    var inviteeEmails = req.body.inviteeEmailAddresses;
    var gameId = req.body.gameId;

    console.log("attempting to send email from playerHandler");
    utils.invitePlayersViaEmail(inviteeEmails, gameId);
    res.end("Invitations sent")
  },

  register : function(req, res){
    console.log('sign up to server ', req.body);
    db.userRegister(req.body, function(results){
      if(results.error){
        res.send(results);
      }else{
        req.session.regenerate(function(){
          req.session.userId = {name:req.body.userName, pass: req.body.password};
        });
        res.send(results);
      }
    });
  },

  signIn : function(req, res){
    db.userSignIn(req.body , function(results){
      if(results.error){
        res.send(results);
      }else{
        req.session.regenerate(function(){
          req.session.userId = {name:req.body.userName, pass: req.body.password};
        });
        console.log(req.session);
        res.send(results);
      }
    });
  }

};

// module.exports.checkGameCallbacks = [
//     module.exports.checkPlayerStatus
// ]