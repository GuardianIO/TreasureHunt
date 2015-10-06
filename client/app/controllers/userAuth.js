angular.module('treasureHunt.userAuth', ['treasureHunt.authService'])
.controller('LogInCtrl', ['$scope', 'AuthFactory', 
  function($scope, AuthFactory){
    $scope.signIn={
      userName : '',
      password : ''
    };
    $scope.register = {
      userName : '',
      password : '',
      passwordRepeat : '',
    };

    $scope.match = false;
    
    $scope.logIn = function(){
      AuthFactory.signIn($scope.signIn.userName, $scope.signIn.password).then(
        function(res){
          console.log('log in ',res);
      });
    };

    $scope.register = function(){
      if($scope.register.password!==$scope.register.passwordRepeat){
        $scope.match = true;
        $scope.register.password = '';
        $scope.register.passwordRepeat = '';
      }else{
        AuthFactory.register($scope.register.userName, $scope.register.password).then(
          function(res){
            console.log('register ',res);
        });
      }

    }


  }]);