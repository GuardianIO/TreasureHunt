angular.module('treasureHunt.games',['treasureHunt.services', 'treasureHunt.filters'])
.controller('GamesCtrl', ['$scope', '$location', '$state', 'RequestFactory', 'SendPicAndLoc', 'geo',
  function($scope, $location, $state, RequestFactory, SendPicAndLoc, geo){
    $scope.games=[];
    $scope.showFilter = false;
    $scope.orderByProp = "createdDate";
    $scope.reversed = "true";
    $scope.loc = {};

    $scope.getAllGames = function(){
      RequestFactory.getGames().then(function(resp){
        $scope.games = resp;
        for(var i = 0; i < $scope.games.length; i++){
          var score = RequestFactory.averageRateInNuts($scope.games[i].avgRating);
          $scope.games[i].average = score;
        }
        if(navigator && navigator.geolocation){
          navigator.geolocation.getCurrentPosition(function(data){
            $scope.loc = data.coords;
            for(var i = 0; i < $scope.games.length; i++){
              var distance = geo.distance($scope.loc.latitude, $scope.loc.longitude, $scope.games[i].lat, $scope.games[i].lon);
              $scope.games[i].distance = distance;
            }
            $scope.$apply();
            console.log('games with distance: ', $scope.games);
          }, 
          function(err){
            if(err.code === 1){
              alert('Please allow geolocation');
            }
          }, {
            enableHighAccuracy:true
          }
          )
        }
      });
    };

    $scope.gameInfo = function(gameId){
      $state.go('gameInfo', {id: gameId});
    };

    $scope.editGame = function(gameId){
      console.log(gameId);
      $location.path('/editGame/'+gameId);
    };

    $scope.filterBySelectedCreator = function(creatorName){
      console.log(arguments);
      alert("filtering by " + creatorName);
    };

    $scope.toggleFilter = function(){
      $scope.showFilter = !$scope.showFilter;
      console.log($scope.showFilter)
    };

    $scope.$watch('reversed', function(val){
      $scope.games.reverse();
      console.log($scope.games)
    });

    $scope.$watch('orderByProp', function(val){
      $scope.games.sort(function(a, b){ 
        if($scope.reversed === "true"){
          return a[$scope.orderByProp] > b[$scope.orderByProp];
        }
          return a[$scope.orderByProp] < b[$scope.orderByProp];});
    });
}]);