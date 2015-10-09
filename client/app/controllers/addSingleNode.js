angular.module('treasureHunt.singleNode', ['treasureHunt.services'])

.controller('AddSingleNodeCtrl', ['$scope', '$location', '$state', 'SendPicAndLoc', 
  function($scope, $location, $state, SendPicAndLoc){

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
      $state.go('invite');
    }
}]);