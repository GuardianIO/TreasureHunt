angular.module('treasureHunt.userPage',['treasureHunt.services'])
.controller('userPageCtrl', ['$scope', '$location', '$state', '$window', 'RequestFactory',
  function($scope, $location, $state, $window, RequestFactory){
    $scope.games=[];
    $scope.showFilter = false;
    $scope.orderByProp = "createdDate";
    $scope.reversed = "true";
    console.log('stateparams: ', $state.params);
    $scope.getAllGames = function(){
      var token = $window.localStorage.getItem('acorn');
      RequestFactory.getGames({userName:$state.params.id,token:token}).then(function(resp){
        $scope.games = resp;
        $scope.nutsArr = [];
        for(var i = 0; i < $scope.games.length; i++){
          var score = RequestFactory.averageRateInNuts($scope.games[i].avgRating);
          $scope.nutsArr.push(score);
        }
      console.log('games', $scope.nutsArr);
      });
    };
    $scope.gameInfo = function(gameId){
      $state.go('gameInfo', {id: gameId});
    };

    $scope.editGame = function(gameId){
      console.log('editGame/'+gameId);
      $state.go('editGame', {id: gameId});
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
    });

    $scope.$watch('orderByProp', function(val){
      $scope.games.sort(function(a, b){ 
        if($scope.reversed === "true"){
          return a[$scope.orderByProp] > b[$scope.orderByProp];
        }
          return a[$scope.orderByProp] < b[$scope.orderByProp];});
    });
}]);