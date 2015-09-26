var express = require('express');
var requestHandlers = require('./requestHandlers');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname + '/../client'));
app.use(bodyParser.json());

// define routes
app.get('/download/:url', requestHandlers.downloadHandler);
app.get('/upload', requestHandlers.uploadHandler);

app.post('/createGame', requestHandlers.createGame);

app.post('/gameNode', function(req, res){
  console.log('new gameNode: ', req.body);
  res.sendStatus(200);
});

// start server
var server = app.listen( (process.env.PORT || 3000), function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('listening at http://%s:%s', host, port);
});