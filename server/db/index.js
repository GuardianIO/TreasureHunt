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
          console.log(err);
        }
        else{
          //gameId = results.insertId
          cb(results.insertId);
        }
      });
  },
  createNodeInfo: function(params, cb){
    var queryStr = "INSERT into treasureInfo(gameId, nodeId, image, lat, lon, clue) VALUES(?,(SELECT nodeId FROM treasureInfo ORDER BY nodeId LIMIT 1)+1,?,?,?,?)";
    var selectStr ="SELECT nodeId FROM treasureInfo WHERE gameId=? ORDER BY nodeId DESC limit 1";
    var long = params.geolocation
    console.log('createTreasureInfo params',params);
    // connection.query(queryStr, params)
  },
  getPlayerContact: function(params,cb) {

  }
};

// module.exports.createNewGame("hunt");
// gameName
// timelineKey, geolocation{lat:, long}, hint, image

// module.exports = connection;