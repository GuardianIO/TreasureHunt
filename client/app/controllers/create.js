angular.module('treasureHunt.create', ['treasureHunt.services'])

.controller('CreateCtrl', ['$scope', '$http', '$state','RequestFactory',
  function($scope, $http, $state, RequestFactory){

  this.createGame = function(gameName, gameDescription){
    if ($scope.createGameForm.$valid) {
      console.log("sending to server to create game");
      RequestFactory.postNewGame(gameName, gameDescription);
      $state.go('/addNode');
    };
  }
}]);

//