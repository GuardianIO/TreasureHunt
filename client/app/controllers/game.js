angular.module('treasureHunt.game', ['treasureHunt.services'])
.controller('GameCtrl', ['$scope', '$location', 'RequestFactory',
  function($scope, $location, RequestFactory){
    $scope.clue = '';
    getGame = function(){
      var gameId = $location.url().split('/').pop();
      if(gameId){
        RequestFactory.getGame(gameId);
      }
    };
    getGame();
}]);