var mysql = require('mysql');

var connection = mysql.createConnection({
  user: "root",
  password: "",
  database: "fileDealer_db"
});

connection.connect();

module.exports = {

  createGameName: function(params, cb) {
      // var gameTable = "INSERT into gameTable(game_name,description, created_date) VALUES(?,?,?)";
      var gameTable = "INSERT into gameTable(game_name) VALUES(?)";
      var d = new Date();
      var createdDate = d.getMonth()+1 + "/"+ d.getDate() + "/"+d.getFullYear();
      connection.query(gameTable, params, function(err, results){
      // connection.query(gameTable, [params.gameName, params.description, createdDate], function(err, results){
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
    var insertStr = "INSERT into playerContact(gameId, email) VALUES(?,?)";
    connection.query(insertStr, [params.gameId, params.email], function(err, results){
      if(err){
        console.error(err);
      }
      else{
        console.log('playerContact results', results);
      }
    });
  },
  postNodeInfo: function(params, cb){
    var selectStr = "SELECT gameId, nodeId, image, lat, lon, clue FROM TreasureInfo WHERE gameId=(?)";
    connection.query(selectStr, params, function(err, results){
      if(err){
        console.err(err);
      }
      else{
        cb(results);
        console.log('postNodeInfo', results);
      }
    });
  },
  //list all games
  //retrieve the only the first image 
  showGames: function(cb){
    var queryStr = "SELECT gameTable.gameId, gameTable.game_name, gameTable.description,gameTable.created_date, treasureInfo.image FROM gameTable, treasureInfo WHERE gameTable.gameId = treasureInfo.gameId;";

    connection.query(queryStr, function(err, results){
      if(err){
        console.err(err);
      }
      else{
        cb(results);
      }
    });
  }
};
// module.exports.showGames(function(game){console.log(game)});


// description, city, length, date created, author
// retrieve: all games, first pic,
// all info: first pic, date created, number of nodes

// gameName
// timelineKey, geolocation{lat:, long}, hint, image

// module.exports = connection;