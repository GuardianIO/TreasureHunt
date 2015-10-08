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
    if(AuthFactory.getAuthState()){
      $location.path('/create');
    }else{
      $scope.$emit('notSignedIn', '/create');
    }
  };
  $scope.$watch(AuthFactory.getAuthState, function(newState, oldState){
    console.log('new state', newState);
    if(newState!==oldState){
      $scope.state.signedIn = newState;
    }
  });
}]);