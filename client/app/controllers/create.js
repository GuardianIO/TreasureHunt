angular.module('fileMaster.create', [])

.controller('CreateCtrl', ['$scope', function($scope){
  $scope.createGame = function(){
    alert("Creating game " + $scope.gameName);
  }
}]);

