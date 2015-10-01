angular.module('treasureHunt.game', ['treasureHunt.services'])
.controller('GameCtrl', ['$scope', '$location', '$interval', 'RequestFactory',
  function($scope, $location, $interval, RequestFactory){
    $scope.clue = '';
    var node = 0;
<<<<<<< HEAD

    $scope.arrived = false;
=======
    $scope.arrived = false;
    $scope.currentNode = {};
>>>>>>> [feat] implemented geo checking in game controller

    updateNode = function(nodeNum){
      $scope.currentNode =  RequestFactory.getNode(nodeNum);
    }

    getGame = function(){
      var gameId = $location.url().split('/').pop();
      if(gameId){
        RequestFactory.getGame(gameId);
      }
    };
<<<<<<< HEAD

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
=======

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
>>>>>>> [feat] implemented geo checking in game controller

    };

    $interval(function(){
      updateNode(node);
<<<<<<< HEAD
    }
    
=======
      navigator.geolocation.getCurrentPosition(checkCoords);
    }, 1000);
    // navigator.geolocation.watchPosition(function(loc){
    //   updateNode(node);
    //   $scope.$apply($scope.currentLocation = loc.coords);
    //   checkCoords();
    // });
    
    getGame();
    navigator.geolocation.getCurrentPosition(checkCoords);
>>>>>>> [feat] implemented geo checking in game controller
    $scope.next = function(){
      updateNode(++node);
    }
    $scope.prev = function(){
      updateNode(--node);
    }
}]);