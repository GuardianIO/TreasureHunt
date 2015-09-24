var express = require('express');
var requestHandlers = require('./requestHandlers');
var app = express();

// define routes
app.get('/download/:url', requestHandlers.downloadHandler);


// start server
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);
});