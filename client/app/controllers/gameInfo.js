angular.module('treasureHunt.gameInfo',['treasureHunt.services', 'treasureHunt.authService'])

.controller('GameInfoCtrl', ['$scope','RequestFactory', '$location', '$state', '$stateParams', 'AuthFactory',
 function($scope, RequestFactory, $location, $state, $stateParams, AuthFactory){
  var vm = this;
  $scope.game={};

  $scope.isUser = function(){
    return $scope.game.createdBy === AuthFactory.getUserName();
  };

  vm.gameId = $location.url().split('/').pop();
  $scope.startGame = function(){
    RequestFactory.getGameInfo(vm.gameId,function(game){
      $scope.game = game.data[0];
      $scope.nutsArr = RequestFactory.averageRateInNuts($scope.game.avgRating);
    });
  };

  $scope.playGame = function(){
    $state.go('game', {id: vm.gameId});
  };

  $scope.edit = function(){
    $state.go('editGame', {id: vm.gameId});
  }
}]);