var mysql = require('mysql');

var connection = mysql.createConnection({
  user: "root",
  password: "",
  database: "fileDealer_db"
});

connection.connect();

module.exports = {

  createGameName: function(params, cb) {
      var gameTable = "INSERT into gameTable(game_name) VALUES(?)";
      connection.query(gameTable, params, function(err, results){
        if(err){
          console.error(err);
        }
        else{
          //gameId = results.insertId
          cb(results.insertId);
        }
      });
  },
  createNodeInfo: function(params, cb){
    var insertStr = "INSERT into treasureInfo(lon, lat, image, clue, nodeId, gameId) VALUES(?,?,?,?,?,?)";
    var selectStr ="SELECT nodeId FROM treasureInfo WHERE gameId=(?) ORDER BY nodeId DESC limit 1";
    var nodeId = 1;
    console.log('createTreasureInfo params',params);
    connection.query(selectStr, [params.gameId], function(err, results){
      if(err){
        console.error(err);
      }
      else{
        console.log('SELECT results',results)
        if(results[0]){
          nodeId = results[0].nodeId+1;
        }
        console.log('this should be nodeid ',nodeId);
        connection.query(insertStr, [params.longitude, params.latitude, params.imgKey, params.clue, nodeId, params.gameId],
          function(err, results){
            if(err){
              console.error(err);
            }
            else{
              console.log(results);
            }
          });
      }
    });
  },
  getPlayerContact: function(params,cb) {

  }
};

// module.exports.createNewGame("hunt");
// gameName
// timelineKey, geolocation{lat:, long}, hint, image

// module.exports = connection;