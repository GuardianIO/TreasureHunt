angular.module('treasureHunt.game', ['treasureHunt.services'])
.controller('GameCtrl', ['$scope', '$location', '$interval', 'RequestFactory',
  function($scope, $location, $interval, RequestFactory){
    $scope.clue = '';
    var node = 0;
    $scope.arrived = false;
    $scope.currentNode = {};

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

    $interval(function(){
      updateNode(node);
      navigator.geolocation.getCurrentPosition(checkCoords);
    }, 1000);

    checkCoords = function(data){
      var coords = data.coords;
      var x = coords.latitude - $scope.currentNode.lat;
      var y = coords.longitude - $scope.currentNode.lon;
      var distance = Math.sqrt( (x)*(x) + (y)*(y) );

      if(distance < 0.0001){
        $scope.arrived = true;
        console.log('arrived!');
      }else{
        console.log(distance);
      }
    };

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