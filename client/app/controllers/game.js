angular.module('treasureHunt.game', ['treasureHunt.services'])
.controller('GameCtrl', ['$scope', '$location', 'RequestFactory',
  function($scope, $location, RequestFactory){
    $scope.clue = '';
    $scope.arrived = false;
    $scope.currentLocation = {};
    getGame = function(){
      var gameId = $location.url().split('/').pop();
      if(gameId){
        RequestFactory.getGame(gameId);
      }
    };
    updateNode = function(){
    
    };
    checkCoords = function(){

    };
    navigator.geolocation.watchPosition(function(loc){
      $scope.$apply(angular.extend($scope.currentLocation, loc.coords))
    }

    getGame();
}]);