// var sendgrid = require('sendgrid')('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');
var sendgrid = require('sendgrid')('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');

var urlHtml ='';
var host =  host ||'http://127.0.0.1:3000/game/';

module.exports.emailInvitee = function (email, gameId) {
  console.log('sendgrid data * * * : ', email, gameId, host)
  sendgrid.send({
    to: email,
    from: 'tbutman@gmail.com',
    subject: 'Welcome to Scavenger Hunt!',
    text: 'Howdy Urban Adventurer,' + '\n\nYou have been invited by a friend to play Scavenger Hunter, the premier online scavenger hunt game.'+
          '\n\nPlease click the following link to embark on your journey: ' + host + gameId +
          '\n\n\nSincerely,\n\nThe Scavenger Hunt Team'
  },
  function (err, json) {
    if(err) {return console.error(err);}
    console.log('sendgrid api error:', json);
  });
};