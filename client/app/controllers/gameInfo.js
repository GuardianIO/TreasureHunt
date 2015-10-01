angular.module('tresureHunt.gameInfo',[])

.controller('GameInfoCtrl', ['$scope', '$http','RequestFactory', function($scope, $http, RequestFactory){
  console.log(RequestFactory.getGames());
}]);