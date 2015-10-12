angular.module('treasureHunt.myGames',['treasureHunt.services'])
.controller('myGamesCtrl', ['$scope', '$location', '$state', '$window', 'RequestFactory',
  function($scope, $location, $state, $window, RequestFactory){
    $scope.games=[];
    $scope.getAllGames = function(){
      var token = $window.localStorage.getItem('acorn');
      RequestFactory.getGames(token).then(function(resp){
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
      console.log('editGame/'+gameId);
      $state.go('editGame', {id: gameId});
    };

}]);