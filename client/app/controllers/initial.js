angular.module('treasureHunt.initial', ['treasureHunt.authService'])

.controller('InitialCtrl', ['$scope', '$location', 'AuthFactory',
  function($scope, $location, AuthFactory){
  $scope.state = {
    signedIn : AuthFactory.getAuthState()
  }
  $scope.join = function(){
    $location.path('/games');
  };
  $scope.create = function(){
    $location.path('/create');
  }
}]);