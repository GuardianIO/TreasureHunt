var mysql = require('mysql');

var connection = mysql.createConnection({
  user: "root",
  password: "",
  database: "fileDealer_db"
});

connection.connect();

module.exports = {
  createGameName: { 
    function(params, cb) {
      var queryStr = "INSERT into gameTable(game_name) VALUES(?)";
      connection.query(queryStr, params, function(err, results){
        if(err){
          console.log(err);
        }
        else{
          // 
        }
      });
    }
  },
  createTreasureInfo: {
    function(params, cb){
    }
  },
  getPlayerContact: {
    function(params,cb) {

    }
  }
}

// gameName
// timelineKey, geolocation{lat:, long}, hint, image

// module.exports = connection;