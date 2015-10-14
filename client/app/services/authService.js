angular.module('treasureHunt.authService', [])
.factory('AuthFactory', ['$http', function($http){
  var signedIn = false;
  var userName = 'anon';
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
        userName = res.data.userName;
        return res;
      });
    },

    getUserName : function(){
      return userName;
    },

    signIn : function(userName, password){
      return $http.post('/signIn', {
        userName : userName,
        password : password
      }).then(function(res){
        userName = res.data.userName;
        return res;
      });
    },

    register : function(userName, password){
      return $http.post('/register', {
        userName : userName,
        password : password
      }).then(function(res){
        userName = res.data.userName;
        return res;
      });
    }
  };
}]);