angular.module('treasureHunt.services', ['ngFileUpload', 'ngCookies'])
.factory('RequestFactory', ['$http', '$location', 
function($http, $location){
  var gameId = "";
  var games = [];
  var currentGame = {};
  var nutsArr = [];
  var nuts = {
    grayNut: "img/nut-gray-copy.png",
    fullNut: "img/nut-full.png",
    halfNut: "img/nut-half.png"
  }
  var gameToEdit;

  gameSetup = function(currentNodeNum){
    if(Array.isArray(currentGame.nodes)){
      currentGame.nodes.forEach(function(node, index){
        console.log('currentNodeNum', currentNodeNum, 'index', index);
        if(index + 1 < currentNodeNum){
          node.found = true;
        }else{
          node.found=false;
        }
      });
    }
  };

  return {
    averageRateInNuts: function(avgRating){
      var fraction = avgRating % 1;
      var j;
      if(nutsArr.length > 0){
        nutsArr = [];
      }
      if(fraction >= 0.3 && fraction <= 0.7){
        nutsArr[Math.floor(avgRating)] = nuts.halfNut;
      }
      if(nutsArr[Math.floor(avgRating)] === undefined){
        j = Math.floor(avgRating);
      }
      else{
        j = Math.floor(avgRating) + 1;
      }
      for(var i = Math.floor(avgRating) - 1; i >= 0; i--){
        nutsArr[i] = (nuts.fullNut);
      }
      while(j < 5){
        nutsArr.push(nuts.grayNut);
        j++;
      }
      return nutsArr;
    },
    sendScoreRating: function(score, gameId, cb){
      $http.post('/score', {score: score, gameId: gameId})
      .then(function(results, err){
        cb(results.data.avg);
        console.log('score posted!', results.data.avg);
      },function(err){
          console.error(err);
        });
    },
    getGameId : function(){
      return gameId;
    },
    setGameId: function(gameID){
      console.log('in services set game id')
      gameId = gameID;
    },
    currentGame: function(){
      return currentGame;
    },
    postNewGame: function(gameName, gameDescription, makeGamePrivate, token){
      console.log('private: ', makeGamePrivate);
      $http.post('/createGame', { gameName: gameName, gameDescription: gameDescription, private: makeGamePrivate, token: token})
        .then( function(resp){
          gameId = resp.data.gameId;
          console.log("Game created with ID: " + gameId);
        }, function(err){
          console.error('Error ',err);
        });        
    },

    getGames: function(token){
      return $http.post('/games', token).then(function(resp){
        return resp.data;
      });
    },
    getGame:function(gameId, currentNodeNum,  cb){
      $http.post('/game', {
        gameId:gameId
      })
      .then(function(results){
        if(results.data.length){
          currentGame = {
            gameId: gameId,
            name:results.data[0].gameName,
            description: results.data[0].description,
            nodes:results.data
          };
          console.log('factory current', currentGame);
          gameSetup(currentNodeNum);
        }
        cb(currentGame.nodes.length);
      }, function(err){
        console.error(err);
      })
    }, 
    getEditGame:function(gameId, cb){
      $http.post('/game', {
        gameId:gameId
      })
      .then(function(results){
        if(results.data.length){
          gameToEdit = {
            gameId: gameId,
            name:results.data[0].gameName,
            description: results.data[0].description,
            nodes:results.data
          };
        }
        cb(gameToEdit);
      }, function(err){
        console.error(err);
      })
    }, 
    updateGame:function(game){
      return $http.post('/update', {
        gameId: game.gameId,
        nodes: game.nodes
      })
      .then(function(results){
        return results;
      }, function(err){
        return err;
      })
    },
    deleteGame: function(cb){
      $http.delete('update', {
        gameId: gameToEdit.gameId
      })
      .then(function(results){
        if(cb){
          cb(results);
        }
      }), function(err){
        console.log(error);
      }
    },

    getGameInfo: function(gameId, cb){
      $http.post('/gameInfo', {
        gameId:gameId
      })
        .then(function(results, err){
          cb(results);
        },function(err){
          console.error(err);
        })
    },
    getNode:function(nodeNum){
      if(currentGame.nodes){
        return currentGame.nodes[nodeNum];
      }
      return null;
    },
    getCreatorsData: function(cb){
      $http.get('/about')
      .then(function(results, err){
        console.log('getCreatorsData fact', results.data);
        cb(results.data);
      }, function(err){
        console.error(err);
      });
    }
  }
}])

.factory('SendPicAndLoc', ['$rootScope', '$http', '$location', 'Upload', 'RequestFactory',
  function($rootScope, $http, $location, Upload, RequestFactory){

    function postPic(file, data, url, cb){
      Upload.upload({
        url: url,
        file: file,
        data: data
      })
      .success(function(data, status, headers, config){
        cb();
        console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
      })
      .error(function(data, status, headers, config){
        console.log('error status: ', status);
      })
    };

    return {
      loc:null,
      clue:'',
      watchId:null,
      watchLoc:function(){
        if(navigator && navigator.geolocation){
          navigator.geolocation.watchPosition(function(data){
            this.loc = data;
            $rootScope.$broadcast('locReady');
          }.bind(this), 
          function(err){
            if(err.code === 1){
              alert('Please allow geolocation');
            }
          }, {
            enableHighAccuracy:true
          }
          )
        }
      },
      sendPic:function(file, data, cb){
        if(data.token){
          postPic(file, data, '/newUserImage', cb);
        }else{
          var data = {
            gameId : RequestFactory.getGameId(),
          };

          data.latitude = this.loc.coords.latitude;
          data.longitude = this.loc.coords.longitude;
          data.clue = this.clue;

          postPic(file, data, '/addNode', cb);
        }
      },
      cancelWatch:function(){
        navigator.geolocation.clearWatch(this.watchId);
      }
    };
}])

// invitePlayers method will submit post request to '/invite' with array of invities and server will email each invitee
.factory('InvitePlayers', ['$http', '$location', 'RequestFactory', function($http, $location, RequestFactory){
  return {
    invitePlayers: function(arrayOfEmailAddresses){
      console.log(arrayOfEmailAddresses + " in invite players");
      $http.post('/invite', { inviteeEmailAddresses: arrayOfEmailAddresses, gameId: RequestFactory.getGameId() })
        .then(function(resp){
          // on success
          
        }, function(resp){
          // on failure
          console.log(resp.data);
        })
    }
  };
}])

.factory('geo', [function(){
  return {
    distance:function(lat1, lon1, lat2, lon2){
      /* implemented from https://en.wikipedia.org/wiki/Great-circle_distance */
      var c = Math.PI/180;
      lat1 = lat1*c;
      lat2 = lat2*c;
      lon1 = lon1*c;
      lon2 = lon2*c;
      return 6371000 * 2 * Math.asin(Math.sqrt(
          Math.sin((lat2-lat1) / 2) * Math.sin((lat2-lat1) / 2) + Math.cos(lat1)*Math.cos(lat2)*
          Math.sin((lon2-lon1) / 2) * Math.sin((lon2-lon1) / 2)
        ));
    },
  };
}]);




