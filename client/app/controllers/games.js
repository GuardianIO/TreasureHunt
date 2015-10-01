angular.module('treasureHunt.games',['treasureHunt.services'])
.controller('GamesCtrl', ['$scope', 'RequestFactory',
  function($scope, RequestFactory){
    $scope.games=[]
    $scope.getAllGames = function(){
      $scope.games=RequestFactory.getGames();
    }
}]);