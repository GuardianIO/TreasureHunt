angular.module('treasureHunt.initial', [])

.controller('InitialCtrl', ['$scope', '$location',  function($scope, $location){
  $scope.join = function(){
    $location.path('/game');
  };
  $scope.create = function(){
    $location.path('/create');
  }
}]);