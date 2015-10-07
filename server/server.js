var express = require('express');
var session = require('express-session');
var requestHandlers = require('./requestHandlers');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var playerHandlers = require('./playerHandlers');
var app = express();

app.set('trust proxy', 1); // trust first proxy
app.use(session({
  secret: 'squirrel looking for nuts',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));


app.use(cookieParser());

app.use(express.static(__dirname + '/../client'));
app.use(express.static(__dirname + '/../bower_components'));
app.use(bodyParser.json());
// cookie-parser middleware will parse cookie data from headers of request object and will 
// assign assign them to a variable on the request object on req.cookie


// define routes
// player will access game using a link with the gameId
// a route can be handled using an array of callbacks

app.get('/download/:url', requestHandlers.downloadHandler);
app.post('/games', requestHandlers.getAllGames);

app.post('/addWaypoint', requestHandlers.uploadHandler);

app.post('/gameInfo', requestHandlers.getGameInfo);
app.post('/game', playerHandlers.checkPlayerStatus, requestHandlers.getGame);
app.post('/createGame', requestHandlers.createGame);

app.post('/gameNode', function(req, res){
  console.log('new gameNode: ', req.body);
  res.sendStatus(200);
});

// invite players
app.post('/invite', playerHandlers.invitePlayers);
//user authentication
app.post('/register', playerHandlers.register);
app.post('/signIn', playerHandlers.signIn);

// start server
var server = app.listen( (process.env.PORT || 3000), function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('listening at http://%s:%s', host, port);
});