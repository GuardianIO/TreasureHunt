var mysql = require('mysql');

var connection = mysql.createConnection({
  user: "root",
  password: "",
  database: "gooseEggs"
});

connection.connect();

module.exports = {

  createGame: function(params, cb) {
      var gameTable = "INSERT INTO gameInfo(gameName, description, createdDate) VALUES(?,?,?)";
      var today = new Date();
      var createdDate = today.getMonth()  +1 + "/"+ today.getDate() + "/"+ today.getFullYear();
      connection.query(gameTable, [params.gameName, params.description, createdDate], function(err, results){        
        if(err){
          console.error(err);
        }
        else{
          console.log('results ',results);
          gameId = results.insertId
          cb(gameId);
        }
      });
  },
  createNodeInfo: function(params, cb){
    var insertStr = "INSERT INTO nodeInfo(lon, lat, image, clue, nodeId, gameId) VALUES(?,?,?,?,?,?)";
    var selectStr ="SELECT nodeId FROM nodeInfo WHERE gameId=(?) ORDER BY nodeId DESC LIMIT 1";
    var nodeId = 1;
    // console.log('createTreasureInfo params',params);
    connection.query(selectStr, [params.gameId], function(err, results){
      if(err){
        console.error(err);
      }
      else{
        // console.log('SELECT results',results)
        if(results[0]){
          nodeId = results[0].nodeId+1;
        }
        // console.log('this should be clue ',params.clue);
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
    var insertStr = "INSERT INTO playerInfo(gameId, email) VALUES(?,?)";
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
    var selectStr = "SELECT gameId, nodeId, \
    image, lat, lon, clue \
    FROM nodeInfo WHERE gameId=(?)";
    connection.query(selectStr, params, function(err, results){
      if(err){
        console.error(err);
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

    var queryStr = "SELECT DISTINCT \
        g.gameName, \
        n.gameId, \
        g.description, \
        g.createdDate, \
        c.nodeCount, \
        i.image \
        FROM gameInfo AS g \
        JOIN nodeInfo AS n \
        ON n.gameId = g.gameId \
        JOIN ( \
          SELECT gameId, \
          COUNT(nodeId) AS nodeCount \
          FROM nodeInfo GROUP BY gameId ) AS c \
        ON c.gameId = n.gameId \
        JOIN ( \
          SELECT gameId, \
          image, MIN(nodeId) AS nodeId \
          FROM nodeInfo GROUP BY gameId ) AS i \
        ON i.gameId = n.gameId";
    connection.query(queryStr, function(err, results){
      if(err){
        console.error(err);
      }
      else{
        console.log(results);
        cb(results);
      }
    }); 
  },
  getGameInfo : function(id, cb){
    console.log(id);
    var selectStr = "SELECT DISTINCT \
      g.gameName, g.description, g.createdDate, \
      n.nodeId, n.lat, n.lon, n.image, n.clue \
      FROM nodeInfo AS n \
      JOIN gameInfo AS g \
      ON g.gameId = n.gameId \
      WHERE g.gameId = (?)";
    connection.query(selectStr, id, function(err, results){
      if(err){
        console.error(err);
      }
      cb(err, results);
    });
  },
  getGameIntro: function(id, cb){
    var selectStr = "SELECT DISTINCT \
        g.gameName, \
        n.gameId, \
        g.description, \
        g.createdDate, \
        c.nodeCount, \
        i.image \
        FROM gameInfo AS g \
        JOIN nodeInfo AS n \
        ON n.gameId = g.gameId \
        JOIN ( \
          SELECT gameId, \
          COUNT(nodeId) AS nodeCount \
          FROM nodeInfo GROUP BY gameId ) AS c \
        ON c.gameId = n.gameId \
        JOIN ( \
          SELECT gameId, \
          image, MIN(nodeId) AS nodeId \
          FROM nodeInfo GROUP BY gameId ) AS i \
        ON i.gameId = n.gameId \
        WHERE n.gameId = (?)";
    connection.query(selectStr, id, function(err, results){
      if(err){
        console.error(err);
      }
      else{
        console.log('getGameIntro',results);
        cb(results);
      }
    });
  }
};

