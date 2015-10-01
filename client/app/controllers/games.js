angular.module('treasureHunt.games',['treasureHunt.services'])
.controller('GamesCtrl', ['$scope', 'RequestFactory',
  function($scope, RequestFactory){
    $scope.games=[]
    $scope.getAllGames = function(){
      RequestFactory.getGames().then(function(resp){
        $scope.games = resp;
      });
    };
}]);