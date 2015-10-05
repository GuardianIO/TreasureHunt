angular.module('treasureHunt.game', ['treasureHunt.services', 'ngCookies'])
.controller('GameCtrl', ['$scope', '$location', '$interval', 'RequestFactory', '$q', 'geo', '$cookies', 
  function($scope, $location, $interval, RequestFactory, $q, geo, $cookies){
    $scope.clue = '';
    $scope.numNodes = 0;
    $scope.gameLength;
    $scope.currentNode = null;
    $scope.distance = NaN;
    $scope.isLastGame = false;

    var gameId = $location.url().split('/').pop();
    var interval;

    function searching(notFound){
      if(notFound && $scope.currentNode){
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
      if($scope.currentNode.nodeId < $scope.numNodes){
       searching(false);
       $scope.currentNode = RequestFactory.getNode($scope.currentNode.nodeId);
       searching(true); 
     }
    };

    $scope.prev = function(){
      searching(false);
      if($scope.currentNode.nodeId - 1){
        $scope.currentNode = RequestFactory.getNode($scope.currentNode.nodeId-2);
      }
    }
    
    nodeFound = function(){
      $cookies.putObject(gameId, {
        progress: $scope.currentNode.nodeId
      });
      $scope.currentNode.found = true;
      if($scope.currentNode.nodeId === $scope.gameLength){
        // $location.path('/finishGame');
        $scope.isLastGame = true;
      }
    };  

    checkCoords = function(data){
      $scope.$apply(function(){
        var coords = data.coords;
        var distance = geo.distance(coords.latitude, coords.longitude, $scope.currentNode.lat, $scope.currentNode.lon);
        $scope.distance = distance;
        if(distance < 25){
          nodeFound();
        }
      });
    };

    (function(){
      if(gameId){
        var currentNodeNum = $cookies.getObject(gameId) && $cookies.getObject(gameId).progress ? $cookies.getObject(gameId).progress : 1;
        RequestFactory.getGame(gameId, currentNodeNum, function(numNodes){
          $scope.numNodes = numNodes;
          $scope.gameLength = numNodes;
          if(numNodes){
            $scope.currentNode = RequestFactory.getNode(currentNodeNum-1);
          }
          searching(true);
        });
      }
    })();

    // facebook share button
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;  
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'))

}]);