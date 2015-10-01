angular.module('treasureHunt.services', ['ngFileUpload'])
.factory('RequestFactory', ['$http', '$location', function($http, $location){
  var gameId = "";
  var games = [{gameName:'bigdicks',gameId: 1, desc: 'game1', length:5, imgKey:'https://s3-us-west-1.amazonaws.com/biggerbucket/1443654417129.png'},
                  {gameName:'littledicks', gameId: 2, desc: 'game2', length:27, imgKey:'https://s3-us-west-1.amazonaws.com/biggerbucket/1443654802740.png'}];

  return {
    gameId : gameId,
    getGameId : function(){
      return gameId;
    },
    postNewGame: function(gameName){
      $http.post('/createGame', { gameName: gameName })
        .then(function(resp){
          gameId = resp.data.gameId;
          console.log("Game created with ID: " + gameId);
          $location.path('/addWaypoint');
        }, function(resp){
          console.log(resp.data);
        })        
    },

    getGames: function(){
      return games;
    }

  }
}])

.factory('SendPicAndLoc', ['$rootScope', '$http', '$location', 'Upload', 'RequestFactory',
  function($rootScope, $http, $location, Upload, RequestFactory){

    function postPic(file, loc, clue){
      Upload.upload({
        url:'/addWaypoint',
        file: file,
        data:{
          gameId : RequestFactory.getGameId(),
          latitude : loc.coords.latitude,
          longitude : loc.coords.longitude,
          clue: clue
        }})
        .success(function(data, status, headers, config){
          console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
        })
        .error(function(data, status, headers, config){
          console.log('error status: ', status);
        })
    };

    return {
      loc:null,
      clue:'',
      getLoc:function(){
        if(navigator && navigator.geolocation){
          navigator.geolocation.getCurrentPosition(function(data){
            this.loc = data;
            $rootScope.$broadcast('locReady');
          }.bind(this))
        }
      },
      sendPic:function(file){
        postPic(file, this.loc, this.clue);
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
    }
  }])

