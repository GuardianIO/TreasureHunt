angular.module('treasureHunt.initial', [])

.controller('InitialCtrl', ['$scope', '$location',  function($scope, $location){
  $scope.join = function(){
    $location.path('/games');
  };
  $scope.create = function(){
    $location.path('/create');
  }
}]);