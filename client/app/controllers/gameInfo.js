angular.module('treasureHunt.gameInfo',['treasureHunt.services'])

.controller('GameInfoCtrl', ['$scope','RequestFactory', '$location', function($scope, RequestFactory, $location){
  var vm = this;
  vm.gameId = $location.url().split('/').pop();
  $scope.startGame = function(){
    // RequestFactory.getGame(vm.gameId,function(game){
    //   console.log('getGame', game);
    // });
  }

}]);