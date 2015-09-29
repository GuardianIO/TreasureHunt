angular.module('fileMaster.singleNode', ['fileMaster.services'])

.controller('AddSingleNodeCtrl', ['$scope', 'SendPicAndLoc', 
  function($scope, SendPicAndLoc){
    SendPicAndLoc.getLoc();
    $scope.status = {
      canUpload:false
    };

    $scope.$on('locReady', function(){
      $scope.status.canUpload = true;
      $scope.$apply();
      console.log('location ready, canUpload: ', $scope.status);
    });
}]);