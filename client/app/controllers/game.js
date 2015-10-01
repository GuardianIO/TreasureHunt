angular.module('treasureHunt.game', ['treasureHunt.services'])
.controller('GameCtrl', ['$scope', '$location', 'RequestFactory',
  function($scope, $location, RequestFactory){
    $scope.clue = '';
    var node = 0;
    updateNode = function(nodeNum){
      angular.extend($scope.currentNode,RequestFactory.getNode(nodeNum));
      console.log($scope.currentNode);
    }

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

    $scope.currentNode;
    if(!$scope.currentNode){
      updateNode(node);
    }
    $scope.next = function(){
      updateNode(++node);
    }
    $scope.prev = function(){
      updateNode(--node);
    }
}]);