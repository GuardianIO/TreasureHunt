angular.module('fileMaster.create', ['fileMaster.factory'])

.controller('CreateCtrl', ['$scope', '$http', 'RequestFactory', function($scope, $http, RequestFactory){
  $scope.createGame = function(gameName){
    console.log("creating game")
    RequestFactory.sendGameName(gameName);
  }
}]);

//