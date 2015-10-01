var express = require('express');
var requestHandlers = require('./requestHandlers');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var playerHandlers = require('./playerHandlers');
var app = express();

app.use(express.static(__dirname + '/../client'));
app.use(bodyParser.json());
// cookie-parser middleware will parse cookie data from headers of request object and will 
// assign assign them to a variable on the request object on req.cookie
app.use(cookieParser());

// define routes
// player will access game using a link with the gameId
// a route can be handled using an array of callbacks
app.get('/game/:gameId', playerHandlers.checkGameCallbacks);
app.get('/download/:url', requestHandlers.downloadHandler);

app.post('/games', requestHandlers.getAllGames);
app.post('/addWaypoint', requestHandlers.uploadHandler);

app.post('/gameInfo', requestHandlers.getGame);
app.post('/game', requestHandlers.getGame);
app.post('/createGame', requestHandlers.createGame);

app.post('/gameNode', function(req, res){
  console.log('new gameNode: ', req.body);
  res.sendStatus(200);
});

// invite players
app.post('/invite', playerHandlers.invitePlayers);

// start server
var server = app.listen( (process.env.PORT || 3000), function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('listening at http://%s:%s', host, port);
});