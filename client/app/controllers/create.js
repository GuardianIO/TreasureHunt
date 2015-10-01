angular.module('treasureHunt.create', ['treasureHunt.services'])

.controller('CreateCtrl', ['$scope', '$http', 'RequestFactory',
  function($scope, $http, RequestFactory,){

  $scope.createGame = function(gameName, gameDescription){
    console.log("sending to server to create game");
    RequestFactory.postNewGame(gameName, gameDescription);
  }
}]);

//