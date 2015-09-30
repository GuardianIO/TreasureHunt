angular.module('fileMaster.services', ['ngFileUpload'])
  .factory('RequestFactory', ['$http', '$location', function($http, $location){
    var gameId = "";

    return {
      gameId : gameId,
      getGameId : function(){
        return gameId;
      },
      postNewGame: function(gameName){
        $http.post('/createGame', { gameName: gameName })
          .then(function(resp){
            gameId = resp.data.gameId;
            console.log("Game created with ID: " + gameId);
            $location.path('/huntEditor');
          }, function(resp){
            console.log(resp.data);
          })        
        },
      postNewNode: function(){

      }
    }
  }])

  .factory('SendPicAndLoc', ['$rootScope', '$http', '$location', 'Upload', 
    function($rootScope, $http, $location, Upload){

      function postPic(file, loc){
        console.log('sending file');
        Upload.upload({
          url:'/upload',
          data: {
            file:file,
            location:loc
        })
        .success(function(){
          console.log('success');
        });
      };

      return {
        loc:null,
        getLoc:function(){
          if(navigator && navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(data){
              this.loc = data;
              $rootScope.$broadcast('locReady');
            }.bind(this))
          }
        },
        sendPic:function(file){
          postPic(file, this.loc);
        }.bind(this)
      };
}]);