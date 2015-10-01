angular.module('treasureHunt.gameInfo',[])

.controller('GameInfoCtrl', ['$scope', '$http','RequestFactory', function($scope, $http, RequestFactory){
  $scope.getGame = RequestFactory.getGame();
  console.log($scope.getGame);
  $scope.startGame = function(){

  }

}]);