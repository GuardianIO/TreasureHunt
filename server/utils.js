var jwt = require('jwt-simple');
var _secret = "treasure-hunt";
var email = require("./email.js");

// use json web tokens to encode/decode game information into token
module.exports.encodeGameUrl = function(ob){
  return jwt.encode(ob, _secret);
};

module.exports.decodeGameUrl = function(ob){
  return jwt.decode(ob, _secret);
}

module.exports.invitePlayersViaEmail = function(listOfEmailAddresses){
  console.log("in utils to send email");
  for(var i = 0; i < listOfEmailAddresses.length; i++){
    email.emailInvitee(listOfEmailAddresses[i]);
  }
}

