angular.module('treasureHunt.finishGame',['treasureHunt.services'])

.controller('FinishGameCtrl', ['$scope','RequestFactory', '$location', function($scope, RequestFactory, $location){
  var vm = this;
  vm.gameId = $location.url().split('/').pop();
  $scope.finishLine = function(){
    RequestFactory.getLastGame(vm.gameId, function(lastGame){
      $scope.game = game.data;
      console.log('last game', $scope.game);
    });
  }
}]);