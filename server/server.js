var express = require('express');
var requestHandlers = require('./requestHandlers');
var app = express();

app.use(express.static(__dirname + '/../client'));

// console.log(__dirname + /)


// define routes
app.get('/download/:url', requestHandlers.downloadHandler);
app.get('/upload', requestHandlers.uploadHandler);

// start server
var server = app.listen( (process.env.PORT || 3000), function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('listening at http://%s:%s', host, port);
});