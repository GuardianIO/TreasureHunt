angular.module('treasureHunt.addWaypoint', ['treasureHunt.services'])

.controller('AddWaypoint', ['$scope', '$location', 'SendPicAndLoc', 
  function($scope, $location, SendPicAndLoc){

    SendPicAndLoc.getLoc();
    
    $scope.status = {
      canUpload:false
    };

    $scope.$on('locReady', function(){
      $scope.$apply($scope.status.canUpload = true);
    });

    $scope.send = function(){
      if($scope.file){
        SendPicAndLoc.clue = $scope.clue;
        SendPicAndLoc.sendPic($scope.file);
      }
    };
    
    $scope.done = function(){
      $location.path('/invite');
    }
}]);