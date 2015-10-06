angular.module('treasureHunt.authService', [])
.factory('AuthFactory', ['$http', function($http){
  return {

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