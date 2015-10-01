angular.module('treasureHunt.games',['treasureHunt.services'])
.controller('GamesCtrl', ['$scope', '$location', 'RequestFactory',
  function($scope, $location, RequestFactory){
    $scope.games=[]
    $scope.getAllGames = function(){
      RequestFactory.getGames().then(function(resp){
        $scope.games = resp;
      });
    };

    $scope.gameInfo = function(gameId){
      console.log(gameId);
      $location.path('/game/'+gameId);
    };
}]);