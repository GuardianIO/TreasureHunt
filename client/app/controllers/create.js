angular.module('treasureHunt.create', ['treasureHunt.services', 'treasureHunt.authService'])

.controller('CreateCtrl', ['$scope', '$http', '$state', '$window', 'RequestFactory', 'AuthFactory',
  function($scope, $http, $state, $window, RequestFactory, AuthFactory){
  this.getAuthState = function(){
    return AuthFactory.getAuthState();
  };

  this.createGame = function(gameName, gameDescription, makeGamePrivate){
    if ($scope.createGameForm.$valid) {
      console.log(gameName, gameDescription, makeGamePrivate);
      var token = $window.localStorage.getItem('acorn');

      token = token || undefined;
      RequestFactory.postNewGame(gameName, gameDescription, makeGamePrivate, token);
      $state.go('addNode');
    };
  }
}]);
