var mysql = require('mysql');
var bcrypt = require('bcrypt');

var db_config = {
  user: 'root',
  password: '',
  database: 'gooseEggs'
};

var connection;

var handleDisconnect = function(){
  connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                  // the old one cannot be reused.

  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST'){ // Connection to the MySQL server is usually
      handleDisconnect();                          // lost due to either server restart, or a
    }
  });
};


handleDisconnect();

module.exports = {

  createGame: function(params, cb) {
      var gameTable = "INSERT INTO gameInfo(gameName, description, createdDate, createdBy, avgRating, numOfRatings) VALUES(?,?,?,?,0,0)";
      var today = new Date();
      var createdDate = today.getMonth()  +1 + "/"+ today.getDate() + "/"+ today.getFullYear();
      connection.query(gameTable, [params.gameName, params.description, createdDate, params.userName], function(err, results){        
        if(err){
          console.error('[MYSQL]createGame error: ',err);
        }
        else{
          // console.log('results ',results);
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
        console.error('[MYSQL]createNodeInfo select error: ',err);
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
              console.error('[MYSQL]createNodeInfo insert error: ',err);
            }
            else{
              // console.log(results);
            }
          });
      }
    });
  },
  userRegister: function(params,cb) {
    var insertStr = "INSERT INTO userInfo(userName, password) VALUES(?,?)";

    bcrypt.genSalt(params.userName.length , function(err, salt){
      bcrypt.hash(params.password, salt, function(err, hash){
        connection.query(insertStr, [params.userName, hash], function(err, results){
          if(err){
            console.error("[MYSQL]userRegister error ",err);
            cb({error : "username already exist"});
          }else{
            cb(results);
          }
        });
      });
    });    
  },

  userSignIn: function(params, cb){
    var selectStr = "SELECT password FROM userInfo where userName = (?)";
    connection.query(selectStr, [params.userName], function(err, results){
      if(err){
        console.error('[MYSQL]userSignIn error ',err);
      }else if(results.length){
        bcrypt.compare(params.password, results[0].password, function(err,res){
          console.log(res)
          if(res){
            cb({res: res});
          }else{
            cb({error : 'wrong password'});
          }
        });
        // console.log(results[0].password);
      }else{
        cb('user does not exist');
      }
    });
  },
  postNodeInfo: function(params, cb){
    var selectStr = "SELECT gameId, nodeId, \
    image, lat, lon, clue \
    FROM nodeInfo WHERE gameId=(?)";
    connection.query(selectStr, params, function(err, results){
      if(err){
        console.error('[MYSQL]postNodeInfo error: ',err);
      }
      else{
        cb(results);
        // console.log('postNodeInfo', results);
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
        i.image, \
        g.avgRating, \
        g.numOfRatings \
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
        console.error('[MYSQL]showGames error: ',err);
      }
      else{
        // console.log(results);
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
        console.error('[MYSQL]getGameInfo error: ',err);
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
        i.image, \
        g.avgRating, \
        g.numOfRatings \
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
        console.error('[MYSQL]getGameIntro error: ',err);
      }
      else{
        cb(results);
      }
    });
  },
  sendScore: function(params, cb){
    var updateStr = "UPDATE gameInfo SET avgRating=(?), \
                    numOfRatings=(?) WHERE gameId=(?)";
    var selectStr = "SELECT avgRating, numOfRatings \
                    FROM gameInfo WHERE gameId=(?)";

    connection.query(selectStr, params.gameId, function(err, results){
      if(err){
        console.error('[MYSQL]sendScore',err);
      }
      else{
        var avgRating = results[0].avgRating;
        var numOfRatings = results[0].numOfRatings;
        var avg = ((avgRating * numOfRatings) + params.score) / (numOfRatings + 1);
        console.log('avg', avg);
        connection.query(updateStr, [avg, (numOfRatings+1), params.gameId], function(err, results){
          if(err){
            console.error('[MySQL]updateAvg',err);
          }
          else{
            cb({avg: avg});
          }
        });
      }
    })
  },

  updateGame: function(params, cb){
    var deleteStr = "DELETE FROM nodeInfo Where gameId = (?)";
    var insertStr = "INSERT INTO nodeInfo (lon, lat, image, clue, nodeId, gameId) VALUES";
    var gameId = params.gameId;
    var nodes = params.nodes;
    connection.query(deleteStr, gameId, function(err, results){
      if(err){
        console.error('[MYSQL]updateGame delete error: ', err);
      }
      else{
        var insertArray = [];
        for(var i = 0;i<nodes.length;i++){
          insertStr = insertStr + ' (?,?,?,?,?,?),'
          insertArray.push([nodes[i]['lon'], nodes[i]['lat'], nodes[i]['image'], nodes[i]['clue'], i+1, gameId]);
        }
        insertStr = insertStr.slice(0, -1);
        insertArray = [].concat.apply([], insertArray);
        console.log('array',insertArray);
        console.log('string', insertStr);

        connection.query(insertStr, insertArray, function(err, results){
          if(err){
            console.error('[MYSQL]updateGame insert error: ', err);
          }else{
            console.log(results);
            cb('update done!');
          }
        });
      }
    });
  }
};

