angular.module('treasureHunt.userAuth', ['treasureHunt.authService'])
.controller('LogInCtrl', ['$scope', '$state', 'AuthFactory', '$window', '$location', '$rootScope',
  function($scope, $state, AuthFactory, $window, $location, $rootScope){
    $scope.signIn={
      userName : '',
      password : '',
      error : false
    };
    $scope.register = {
      userName : '',
      password : '',
      passwordRepeat : '',
      error : false
    };
    $scope.state={
      signedIn : false
    };
    $scope.match = false;
    $scope.errorMsg = '';

    var url = $location.url().split('/').pop();

    $scope.$on('notSignedIn', function(event, data){
      url = data;
      $('#loginModal').modal('toggle');
    });

    $rootScope.$on('$locationChangeSuccess', function(event, newLocation, oldLocation) {
      $rootScope.oldLocation = oldLocation;
      console.log('route changed from ', oldLocation, 'to ', newLocation);
    });

    $rootScope.$on('$locationChangeStart', function(event, next, current){
      console.log('route change start from ', current, 'to ', next);
      var modalOn = ($("#loginModal").data('bs.modal') || {}).isShown;
      if($rootScope.oldLocation==next && modalOn){
        event.preventDefault();
        $('#loginModal').modal('toggle');
      }
    });

    $scope.checkState = function(){
      var token = $window.localStorage.getItem('acorn');
      if(token){
        AuthFactory.checkState(token).then(
          function(res){
            $scope.state.signedIn = res.data.auth;
            AuthFactory.setAuthState(res.data.auth);
        });
      }
    };

    $scope.create = function(){
      if(AuthFactory.getAuthState()){
        $state.go('create');
      }else{
        console.log('user not signed in');
        url = '/create';
        $('#loginModal').modal('toggle');
      }
    };

    $scope.signOut = function(){
      $window.localStorage.removeItem('acorn');
      $scope.state.signedIn = false;
      AuthFactory.setAuthState(false);
    };

    $scope.myGames = function(){
      $state.go('myGames');
    };
    
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
          }else if(res.data.error){
            $scope.signIn.error = true;
            $scope.errorMsg = res.data.error;
            console.log('reg error: ', res.data.error);
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
            }else if(res.data.error){
              $scope.register.error = true;
              $scope.errorMsg = res.data.error;
              console.log('reg error: ', res.data.error);
            }
        });
      }
    };

    $scope.anon = function(){
      $location.path(url);
    };

    $scope.leader = function(){
      $state.go('leaderBoard');
    };

  }]);