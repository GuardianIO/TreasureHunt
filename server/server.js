var express = require('express');
var requestHandlers = require('./requestHandlers');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname + '/../client'));
app.use(bodyParser());
// console.log(__dirname + /)

// define routes
app.get('/download/:url', requestHandlers.downloadHandler);
app.post('/upload', requestHandlers.uploadHandler);

// start server
var server = app.listen( (process.env.PORT || 3000), function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('listening at http://%s:%s', host, port);
});