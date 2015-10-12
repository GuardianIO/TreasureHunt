angular.module('userImage', ['ngFileUpload'])

.factory('SendUserImage', ['Upload', '$http', function(Upload, $http){
  return {
    send:function(file, cb){
      Upload.upload(file)
      .success(function(data, status, headers, config){
        cb(data);
      })
      .error(function(){
        console.log('error status: ', status);
      })
    },
    getNodeImages:function(gameData, cb){

      $http.post('/userImages',
        gameData
      )
      .then(
        function(res){
          //success callback
          cb(res.data);
        }, 
        function(res){
          //error callback
          console.error('error:', res.data);
      });
    }
  }
}]);