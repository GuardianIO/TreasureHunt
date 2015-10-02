angular.module('treasureHunt.addNode', ['treasureHunt.services'])

.controller('AddNode', ['$scope', '$location', 'SendPicAndLoc', 
  function($scope, $location, SendPicAndLoc){
    //start requesting the user's location
    SendPicAndLoc.getLoc();
    
    $scope.status = {
      canUpload:false
    };

    $scope.$on('locReady', function(){
      // swap dummy button for Add Waypoint button with functionality
      $scope.$apply($scope.status.canUpload = true);
    });

    $scope.send = function(){
      if($scope.file){
        SendPicAndLoc.clue = $scope.clue;
        SendPicAndLoc.sendPic($scope.file, function(){
          $scope.file=null;
          $scope.clue='';
        });
      }
    };
    
    $scope.done = function(){
      $location.path('/invite');
    }

    $scope.createGame = function(){
      $location.path('/invite');
    }
}]);