angular.module('fileMaster.factory', [])
  .factory('RequestFactory', ['$http', '$location', function($http, $location){
    var gameId = "";

    return {
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
    }
  }])