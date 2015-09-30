angular.module('fileMaster.singleNode', ['fileMaster.services'])

.controller('AddSingleNodeCtrl', ['$scope', 'SendPicAndLoc', 
  function($scope, SendPicAndLoc){


    SendPicAndLoc.getLoc();
    $scope.status = {
      canUpload:false
    };

    $scope.$on('locReady', function(){
      $scope.$apply($scope.status.canUpload = true);
    });

    $scope.send = function(){
      if($scope.file){
        SendPicAndLoc.sendPic($scope.file);
      }
    }
}]);