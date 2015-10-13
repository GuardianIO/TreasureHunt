angular.module('treasureHunt.games',['treasureHunt.services'])
.controller('GamesCtrl', ['$scope', '$location', '$state', 'RequestFactory',
  function($scope, $location, $state, RequestFactory){
    $scope.games=[];
    $scope.showFilter = false;
    $scope.orderByProp = "createdDate";
    $scope.reversed = "true";

    $scope.getAllGames = function(){
      RequestFactory.getGames().then(function(resp){
        $scope.games = resp;
        console.log('gamessss', $scope.games)
        for(var i = 0; i < $scope.games.length; i++){
          var score = RequestFactory.averageRateInNuts($scope.games[i].avgRating);
          $scope.games[i].average = score;
        }
      console.log('average', $scope.games);
      });
    };

    $scope.gameInfo = function(gameId){
      $state.go('gameInfo', {id: gameId});
    };

    $scope.editGame = function(gameId){
      console.log(gameId);
      $location.path('/editGame/'+gameId);
    };

    $scope.filterBySelectedCreator = function(creatorName){
      console.log(arguments);
      alert("filtering by " + creatorName);
    };

    $scope.toggleFilter = function(){
      $scope.showFilter = !$scope.showFilter;
      console.log($scope.showFilter)
    };
}]);