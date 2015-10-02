angular.module('treasureHunt.game', ['treasureHunt.services'])
.controller('GameCtrl', ['$scope', '$location', '$interval', 'RequestFactory', '$q', 'geo',
  function($scope, $location, $interval, RequestFactory, $q, geo){
    $scope.clue = '';
    var node = 0;
    $scope.found = false;
    $scope.currentNode = {};
    $scope.distance = NaN;

    updateNode = function(nodeNum){
      return $q(function(){
        $scope.currentNode = RequestFactory.getNode(nodeNum);
      });
    }

    getGame = function(){
      var gameId = $location.url().split('/').pop();
      if(gameId){
        RequestFactory.getGame(gameId, function(){});
      }
    };

    nodeFound = function(){
      $scope.found = true;
      console.log('found!');
      $interval.cancel(stop);
      $scope.currentNode.found = true;
    };

    var stop = $interval(function(){
      updateNode(node);
      navigator.geolocation.getCurrentPosition(checkCoords, function(err){
        console.error(err)
      },
        {
          enableHighAccuracy:true
        }
      );
    }, 1000);

    checkCoords = function(data){
      $scope.$apply(function(){
        var coords = data.coords;
        var distance = geo.distance(coords.latitude, coords.longitude, $scope.currentNode.lat, $scope.currentNode.lon);
        $scope.distance = distance;
        if(distance < 25){
          nodeFound();
        }else{
          console.log(distance);
        }
      });
    };

    getGame();

    $scope.currentNode;
    if(!$scope.currentNode){
      updateNode(node);
    }
    $scope.next = function(){
      updateNode(++node);
      $scope.found = false;
    }
    $scope.prev = function(){
      updateNode(--node)
      .then(function(){
        $scope.found = $currentNode.found;
      });
    }
}]);