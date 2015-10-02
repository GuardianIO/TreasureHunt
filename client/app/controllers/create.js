angular.module('treasureHunt.create', ['treasureHunt.services'])

.controller('CreateCtrl', ['$scope', '$http', '$state','RequestFactory',
  function($scope, $http, $state, RequestFactory){

  $scope.createGame = function(gameName, gameDescription){
    console.log("sending to server to create game");
    RequestFactory.postNewGame(gameName, gameDescription);
    $state.go('/addNode');
  }
}]);

//