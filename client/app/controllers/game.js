angular.module('treasureHunt.game', ['treasureHunt.services'])
.controller('GameCtrl', ['$scope', '$location', 'RequestFactory',
  function($scope, $location, RequestFactory){
    $scope.clue = '';
    var node = 0;
<<<<<<< HEAD

    $scope.arrived = false;
    $scope.currentNode = {};

=======
>>>>>>> Revert "[feat] implemented geo checking in game controller"
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
    
    $interval(function(){
      updateNode(node);
      navigator.geolocation.getCurrentPosition(checkCoords);
    }, 1000);

    checkCoords = function(data){
      var coords = data.coords;
      var x = coords.latitude - $scope.currentNode.lat;
      var y = coords.longitude - $scope.currentNode.lon;
      var distance = Math.sqrt( (x)*(x) + (y)*(y) );
      console.log($scope.currentNode.lat);
      if(distance < 0.0001){
        $scope.arrived = true;
        console.log('arrived!');
      }else{
        console.log(distance);
      }


    };

    $interval(function(){
      updateNode(node);
      navigator.geolocation.getCurrentPosition(checkCoords);
    }, 1000);

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