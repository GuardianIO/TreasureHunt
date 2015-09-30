angular.module('treasureHunt.services', ['ngFileUpload'])
.factory('RequestFactory', ['$http', '$location', function($http, $location){
  var gameId = "";

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
          $location.path('/huntEditor');
        }, function(resp){
          console.log(resp.data);
        })        
      },
    postNewNode: function(){

    }
  }
}])

.factory('SendPicAndLoc', ['$rootScope', '$http', '$location', 'Upload', 'RequestFactory',
  function($rootScope, $http, $location, Upload, RequestFactory){

    function postPic(file, loc){
      Upload.upload({
        url:'/upload',
        file: file,
        data:{
          gameId:RequestFactory.getGameId(),
          location:loc
        }})
        .success(function(){
          console.log('success');
        });
    };

    return {
      loc:null,
      getLoc:function(){
        if(navigator && navigator.geolocation){
          navigator.geolocation.getCurrentPosition(function(data){
            this.loc = data;
            $rootScope.$broadcast('locReady');
          }.bind(this))
        }
      },
      sendPic:function(file){
        postPic(file, this.loc);
      }
    };
}])

// invitePlayers method will submit post request to '/invite' with array of invities and server will email each invitee
  .factory('InvitePlayers', ['$http', '$location', function($http, $location){
    return {
      invitePlayers: function(arrayOfEmailAddresses){
        console.log(arrayOfEmailAddresses + " in invite players");
        $http.post('/invite', { inviteeEmailAddresses: arrayOfEmailAddresses })
          .then(function(resp){
            // on success
            
          }, function(resp){
            // on failure
            console.log(resp.data);
          })
      }
    }
  }])

.factory('NodeList', ['$scope','$http',  function($scope, $http){
  return {

  }
}]);
