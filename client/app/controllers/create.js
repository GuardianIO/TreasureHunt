angular.module('treasureHunt.create', ['treasureHunt.services'])

.controller('CreateCtrl', ['$scope', '$http', '$state', '$window', 'RequestFactory',
  function($scope, $http, $state, $window, RequestFactory){

  this.createGame = function(gameName, gameDescription){
    if ($scope.createGameForm.$valid) {
      console.log("sending to server to create game");
      var token = $window.localStorage.getItem('acorn');
      console.log('create token ', token);
      console.log(token);
      token = token || undefined;
      RequestFactory.postNewGame(gameName, gameDescription, token);
      $state.go('/addNode');
    };
  }
}]);

//