angular.module('treasureHunt.game', ['treasureHunt.services', 'ngCookies'])
.controller('GameCtrl', ['$scope', '$location', '$interval', 'RequestFactory', '$q', 'geo', '$cookies', 
  function($scope, $location, $interval, RequestFactory, $q, geo, $cookies){
    $scope.clue = '';
    $scope.gameLength;
    $scope.currentNode = {};
    $scope.distance = NaN;
    var interval;

    function searching(notFound){
      if(notFound){
        interval = $interval(function(){
          navigator.geolocation.getCurrentPosition(checkCoords, function(err){
            console.error(err)
          },
            {
              enableHighAccuracy:true
            }
          );
        }, 1000);
      }else{
        $interval.cancel(interval);
      }
    };

    $scope.next = function(){
      searching(false);
      $scope.currentNode = RequestFactory.getNode($scope.currentNode.nodeId);
      searching(true);
    };

    $scope.prev = function(){
      searching(false);
      if($scope.currentNode.nodeId - 1){
        $scope.currentNode = RequestFactory.getNode($scope.currentNode.nodeId-2);
      }
    }
    
    nodeFound = function(){
      $scope.currentNode.found = true;
      if($scope.currentNode.nodeId === $scope.gameLength){
        console.log('Congrats!');
        $location.path('/finishGame');
      }
    };

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

    (function(){
      var gameId = $location.url().split('/').pop();
      if(gameId){
        RequestFactory.getGame(gameId, function(numNodes){
          $scope.gameLength = numNodes;
          if(numNodes){
            $scope.currentNode = RequestFactory.getNode(0);
          }
          searching(true);
        });
      }
    })();

}]);