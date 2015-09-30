angular.module('fileMaster.invite', ['fileMaster.services'])
  .controller('InviteCtrl', ['$scope', '$http', 'InvitePlayers',
    function($scope, $http, InvitePlayers){
      $scope.invitees = [];

      $scope.addToEmailList = function(inviteeEmailAddress){
        $scope.invitees.push(inviteeEmailAddress);
        console.log($scope.invitees);
      };

      $scope.sendInvites = function(){
        for(var i = 0; i < $scope.invitees.length; i++){
          console.log("Sending invite to: " + $scope.invitees[i] + " (from controller)");
        }
        InvitePlayers.invitePlayers($scope.invitees);
      }
  }])