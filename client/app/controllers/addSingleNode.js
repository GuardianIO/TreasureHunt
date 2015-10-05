angular.module('treasureHunt.singleNode', ['treasureHunt.services'])

.controller('AddSingleNodeCtrl', ['$scope', '$location', 'SendPicAndLoc', 
  function($scope, $location, SendPicAndLoc){

    SendPicAndLoc.getLoc();
    
    $scope.status = {
      canUpload:false
    };

    $scope.$on('locReady', function(){
      $scope.$apply($scope.status.canUpload = true);
    });

    $scope.send = function(){
      if($scope.file && $scope.status.canUpload){
        SendPicAndLoc.sendPic($scope.file);
      }
    };

    $scope.createGame = function(){
      $location.path('/invite');
    }
}]);