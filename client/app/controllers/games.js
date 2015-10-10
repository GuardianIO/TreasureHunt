angular.module('treasureHunt.games',['treasureHunt.services'])
.controller('GamesCtrl', ['$scope', '$location', '$state', 'RequestFactory',
  function($scope, $location, $state, RequestFactory){
    $scope.games=[];
    $scope.getAllGames = function(){
      RequestFactory.getGames().then(function(resp){
        $scope.games = resp;
        $scope.nutsArr = [];
        for(var i = 0; i < $scope.games.length; i++){
          var score = RequestFactory.averageRateInNuts($scope.games[i].avgRating);
          $scope.nutsArr.push(score);
        }
      console.log('games', $scope.nutsArr);
      });
    };

    $scope.gameInfo = function(gameId){
      $state.go('gameInfo', {id: gameId});
    };

    $scope.editGame = function(gameId){
      console.log(gameId);
      $location.path('/editGame/'+gameId);
    };
}]);