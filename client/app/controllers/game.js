angular.module('treasureHunt.game', ['treasureHunt.services'])
.controller('GameCtrl', ['$scope', '$location', 'GameFactory',
  function($scope, $location, GameFactory){
    $scope.clue = '';
    getGame = function(){
      var gameId = $location.url().split('/').pop();
      if(gameId){
        GameFactory.getGame(gameId);
      }
    };
    getGame();
}]);