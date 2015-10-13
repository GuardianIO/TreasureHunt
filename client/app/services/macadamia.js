angular.module('treasureHunt.macaService', [])
.factory('Macadamia', ['$http', '$window', function($http, $window){
  return {
    macadamiaPlus : function(nodeInfo){
      console.log('found Node');
      var token = $window.localStorage.getItem('acorn');
      if(token){
        $http.post('/macadamia', {
          token : token,
          gameId : nodeInfo.gameId,
          nodeId : nodeInfo.nodeId,
          macadamia : 1
        }).then(function(res){
          console.log(res);
        });
      }
    },
    macadamiaMinus : function(nodeInfo){
      var token = $window.localStorage.getItem('acorn');
      if(token){
        $http.post('/macadamia', {
          token : token,
          gameId : nodeInfo.gameId,
          nodeId : nodeInfo.nodeId,
          macadamia : -1
        }).then(function(res){
          console.log(res);
        });
      }
    }
  }
}]);