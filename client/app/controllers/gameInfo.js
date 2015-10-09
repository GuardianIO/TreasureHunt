angular.module('treasureHunt.gameInfo',['treasureHunt.services'])

.controller('GameInfoCtrl', ['$scope','RequestFactory', '$location', '$state', '$stateParams',
 function($scope, RequestFactory, $location, $state, $stateParams){
  var vm = this;
  // $scope.nuts = {
  //   grayNut: "../../../img/nut-gray.png",
  //   fullNut: "../../../img/nut-full.png",
  //   halfNut: "../../../img/nut-half.png"
  // };

  vm.gameId = $location.url().split('/').pop();
  $scope.startGame = function(){
    RequestFactory.getGameInfo(vm.gameId,function(game){
      $scope.game = game.data[0];
      $scope.nutsArr = RequestFactory.averageRateInNuts($scope.game.avgRating);
    });
  }

  $scope.playGame = function(){
    $state.go('game', {id: vm.gameId});

  }
}]);