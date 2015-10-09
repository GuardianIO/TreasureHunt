angular.module('treasureHunt.gameInfo',['treasureHunt.services'])

.controller('GameInfoCtrl', ['$scope','RequestFactory', '$location', '$state', '$stateParams',
 function($scope, RequestFactory, $location, $state, $stateParams){
  var vm = this;
  vm.gameId = $location.url().split('/').pop();
  $scope.startGame = function(){
    RequestFactory.getGameInfo(vm.gameId,function(game){
      $scope.game = game.data[0];
      console.log('get game', $scope.game);
    });
  }
  $scope.playGame = function(){
    $state.go('game', {id: vm.gameId});

  }
}]);