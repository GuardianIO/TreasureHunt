angular.module('treasureHunt.initial', ['treasureHunt.authService'])

.controller('InitialCtrl', ['$scope', '$location', '$state', 'AuthFactory',
  function($scope, $location, $state, AuthFactory){
  $scope.state = {
    signedIn : AuthFactory.getAuthState()
  }
  $scope.join = function(){
    $state.go('games');
    // $location.path('/games');
  };
  $scope.create = function(){
    if(AuthFactory.getAuthState()){
      $state.go('create');
      // $location.path('/create');
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