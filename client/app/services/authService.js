angular.module('treasureHunt.authService', [])
.factory('AuthFactory', ['$http', function($http){
  var signedIn = false;
  return {
    getAuthState : function(){
      return signedIn;
    },

    setAuthState : function(state){
      signedIn = state;
    },

    checkState : function(token){
      return $http.post('/check', {
        token : token
      }).then(function(res){
        return res;
      });
    },

    signIn : function(userName, password){
      return $http.post('/signIn', {
        userName : userName,
        password : password
      }).then(function(res){
        return res;
      });
    },

    register : function(userName, password){
      return $http.post('/register', {
        userName : userName,
        password : password
      }).then(function(res){
        return res;
      });
    }
  };
}]);