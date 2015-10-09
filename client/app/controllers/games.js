angular.module('treasureHunt.games',['treasureHunt.services'])
.controller('GamesCtrl', ['$scope', '$location', '$state', 'RequestFactory',
  function($scope, $location, $state, RequestFactory){
    $scope.games=[];
    $scope.getAllGames = function(){
      RequestFactory.getGames().then(function(resp){
        $scope.games = resp;
      });
    };

    $scope.gameInfo = function(gameId){
      $state.go('gameInfo', {id: gameId});
    };
}]);