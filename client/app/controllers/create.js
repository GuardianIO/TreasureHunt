angular.module('fileMaster.create', ['fileMaster.services'])

.controller('CreateCtrl', ['$scope', '$http', 'RequestFactory', 
  function($scope, $http, RequestFactory){
  $scope.createGame = function(gameName){
    console.log("sending to server to create game " + gameName)
    RequestFactory.postNewGame(gameName);
  }
}]);

//