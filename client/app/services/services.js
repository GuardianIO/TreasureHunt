angular.module('fileMaster.services', ['ngFileUpload'])
  .factory('RequestFactory', ['$http', '$location', function($http, $location){
    var gameId = "";

    return {
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

      function postPic(file){
        Upload({
          url:'/upload',
          file: file,
          loc:location
        })
        .success(function(){
          sendPicAndLocSuccess = true;
        });
      };

      return {
        getLoc:function(){
          if(navigator && navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(data){
              $rootScope.$broadcast('locReady');
            }.bind(this))
          }
        },
        sendPic:function(file){
          postPic(file);
        }
      };
}]);