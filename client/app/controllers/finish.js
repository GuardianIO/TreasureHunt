angular.module('treasureHunt.finishGame',['treasureHunt.services'])

.controller('FinishGameCtrl', ['$scope','RequestFactory', '$location', function($scope, RequestFactory, $location){
  var vm = this;
  vm.gameId = $location.url().split('/').pop();
  vm.lastGame = RequestFactory.getLastGame;
  console.log(1);
  $scope.finishLine = function(){
  }
}]);