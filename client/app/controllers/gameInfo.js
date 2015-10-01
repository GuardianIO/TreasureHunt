angular.module('tresureHunt.gameInfo',[])

.controller('gameInfoCtrl', ['$scope', '$http','RequestFactory', function($scope, $http, RequestFactory){
  console.log(RequestFactory.getGames());
}]);