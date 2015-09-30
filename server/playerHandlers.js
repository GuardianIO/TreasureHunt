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
  res.send("Accessing game with id: " + req.params.gameId);    
};

module.exports.checkGameCallbacks = [
  exports.checkPlayerStatus,
  exports.sendResponse
];
