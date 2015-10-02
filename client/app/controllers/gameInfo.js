angular.module('treasureHunt.gameInfo',['treasureHunt.services'])

.controller('GameInfoCtrl', ['$scope','RequestFactory', '$location', function($scope, RequestFactory, $location){
  var vm = this;
  vm.gameId = $location.url().split('/').pop();
  $scope.startGame = function(){
    RequestFactory.getGameInfo(vm.gameId,function(game){
      $scope.game = game.data;
      console.log('get game', $scope.game);
    });
  }
  $scope.playGame = function(){
    $location.path('/game/'+vm.gameId);
  }
}]);