angular.module('treasureHunt.userAuth', ['treasureHunt.authService'])
.controller('LogInCtrl', ['$scope', 'AuthFactory', '$window', '$location',
  function($scope, AuthFactory, $window, $location){
    $scope.signIn={
      userName : '',
      password : ''
    };
    $scope.register = {
      userName : '',
      password : '',
      passwordRepeat : ''
    };
    $scope.state={
      signedIn : false
    };
    $scope.match = false;

    var url = $location.url().split('/').pop();

    $scope.$on('notSignedIn', function(event, data){
      url = data;
      $('#loginModal').modal('toggle');
    });

    $scope.checkState = function(){
      var token = $window.localStorage.getItem('acorn');
      if(token){
        AuthFactory.checkState(token).then(
          function(res){
            $scope.state.signedIn = res;
            console.log('checkState data ',res.data);
            AuthFactory.setAuthState(res.data);
        });
      }
    };

    $scope.create = function(){
      if(AuthFactory.getAuthState()){
        $location.path('/create');
      }else{
        console.log('user not signed in');
        url = '/create';
        $('#loginModal').modal('toggle');
      }
    }

    $scope.signOut = function(){
      $window.localStorage.removeItem('acorn');
      $scope.state.signedIn = false;
      AuthFactory.setAuthState(false);
    }
    
    $scope.logIn = function(){
      AuthFactory.signIn($scope.signIn.userName, $scope.signIn.password).then(
        function(res){
          console.log('log in ',res);
          if(res.data.token){
            $window.localStorage.setItem('acorn', res.data.token);
            $scope.state.signedIn = res.data.auth;
            AuthFactory.setAuthState(res.data.auth);
            $('#loginModal').modal('toggle');
            $location.path(url);
          }
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
            if(res.data.token){
              $window.localStorage.setItem('acorn', res.data.token);
              $scope.state.signedIn = res.data.auth;
              AuthFactory.setAuthState(res.data.auth);
              $('#loginModal').modal('toggle');
              $location.path(url);
            }
        });
      }
    };



  }]);