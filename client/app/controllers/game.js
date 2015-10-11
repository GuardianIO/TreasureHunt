angular.module('treasureHunt.game', ['treasureHunt.services', 'ngCookies'])
.controller('GameCtrl', ['$scope', '$location', '$state', '$interval', 'RequestFactory', '$q', 'geo', '$cookies', '$rootScope', 
  function($scope, $location, $state, $interval, RequestFactory, $q, geo, $cookies, $rootScope){
    $scope.clue = '';
    $scope.numNodes = 0;
    $scope.gameLength;
    $scope.currentNode = null;
    $scope.distance = NaN;
    $scope.isLastNode = false;
    $scope.nextButtonGone = false;
    $scope.progress;
    $scope.currentProgress;
    $scope.image = "../../../img/nut-gray.png"
    $scope.showImage = true;
    $scope.avg;

    $rootScope.$on('$locationChangeSuccess', function(event, newLocation, oldLocation) {
      $rootScope.oldLocation = oldLocation;
    });

    $rootScope.$on('$locationChangeStart', function(event, next, current){
      var imgClue = ($("#imageClueModal").data('bs.modal') || {}).isShown;
      var finish = ($("#basicModal").data('bs.modal') || {}).isShown;
      if($rootScope.oldLocation==next){
        if(imgClue){
          event.preventDefault();
          $('#imageClueModal').modal('toggle');
        }
        if(finish){
          event.preventDefault();
          $('#basicModal').modal('toggle');
        }
      }
    });


    var gameId = $location.url().split('/').pop();
    var gameNodeArr = [];
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
    var showNodeTimer = function(){
      var pistachio = $cookies.getObject('pistachio');
      var now = new Date().getTime();
      if(pistachio){
        if((now - pistachio.timer) < 1800000 ){
          return 1800000 - (now - pistachio.timer);
        }
      }
      $cookies.putObject('pistachio', { timer : now });
      return true;
    };

    $scope.getRoute = function(){
      var pistachio = showNodeTimer();
      if(typeof pistachio === 'boolean' ){
        var lat = $scope.currentNode.lat;
        var lon = $scope.currentNode.lon;
      // If it's an iPhone..
        if( (navigator.platform.indexOf("iPhone") != -1) 
          || (navigator.platform.indexOf("iPod") != -1)
          || (navigator.platform.indexOf("iPad") != -1)) {
            window.open("maps://maps.google.com/maps?daddr="+lat+","+lon+"&amp;ll=");
        }
        else{
          window.open("http://maps.google.com/maps?daddr="+lat+","+lon+"&amp;ll=");
        }
      }else{
        pistachio = Math.floor(pistachio / 1000);
        seconds = pistachio % 60;
        pistachio = Math.floor(pistachio / 60);
        minutes = pistachio % 60
        alert('Not available yet!\nYou have to wait '+Math.round(minutes)+' minutes, '+Math.round(seconds)+' seconds.');
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
      console.log($scope.nextButtonGone, 'gone button');
      $scope.nextButtonGone = false;
    }

    $scope.restartGame = function(){
      console.log('$cookies', $cookies);
      $cookies.remove(gameId);
      $scope.isLastNode = false;
      setTimeout(function(){
        $state.go('gameInfo', {id: gameId});
      },1000);
    }

    $scope.rate = function (event) {
      var score = $(angular.element(event.target)[0]).data('id');
      $scope.showImage = false;
      RequestFactory.sendScoreRating(score, gameId, function(avg){
        console.log('avg', avg );
        var decimal = avg % 1;
        if(decimal >= 0.3 && decimal <= 0.7){
          $scope.avg = Math.floor(avg) + 0.5;
        }
        else{
          $scope.avg = Math.floor(avg);
        }
        $scope.showImage = false;
      });
    };

    nodeFound = function(){
      $cookies.putObject(gameId, {
        progress: $scope.currentNode.nodeId
      });
      $scope.currentNode.found = true;
      if($scope.currentNode.nodeId === $scope.gameLength){
        $scope.isLastNode = true;
        $scope.nextButtonGone = true;
      }
    };  

    checkCoords = function(data){
      $scope.$apply(function(){
        var coords = data.coords;
        var distance = geo.distance(coords.latitude, coords.longitude, $scope.currentNode.lat, $scope.currentNode.lon);
        $scope.distance = distance;
        if(distance < 25){
          if($scope.currentProgress === undefined || $scope.currentNode.nodeId >= $scope.currentProgress){
            var gameArrIndex = gameNodeArr.indexOf($scope.currentNode.nodeId) + 1;
            $scope.progress = ((gameArrIndex/(gameNodeArr.length))*100).toString() + "%";
          }
          nodeFound();
        }
      });
    };

    function progressUpdate(){
      if($cookies.getObject(gameId) !== undefined){
        $scope.currentProgress = $cookies.getObject(gameId).progress;
        var gameArrIndex = gameNodeArr.indexOf($scope.currentNode.nodeId) + 1;
        $scope.progress = ((gameArrIndex/(gameNodeArr.length))*100).toString() + "%";
      }
    }

    (function(){
      if(gameId){
        var currentNodeNum = $cookies.getObject(gameId) && $cookies.getObject(gameId).progress ? $cookies.getObject(gameId).progress : 1;
        RequestFactory.getGame(gameId, currentNodeNum, function(numNodes){
          $scope.numNodes = numNodes;
          $scope.gameLength = numNodes;
          if(numNodes){
            $scope.currentNode = RequestFactory.getNode(currentNodeNum-1);
          }
          currentGame = RequestFactory.currentGame();
          for(var i = 0; i < currentGame.nodes.length; i++){
            gameNodeArr.push(currentGame.nodes[i].nodeId);
          }
          progressUpdate();
          searching(true);
        });
      }
    })();
}]);