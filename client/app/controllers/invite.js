angular.module('treasureHunt.invite', ['treasureHunt.services'])
  .controller('InviteCtrl', ['$scope', '$http', 'InvitePlayers',
    function($scope, $http, InvitePlayers){
      $scope.invitees = [];

      $scope.addToEmailList = function(inviteeEmailAddress){
        $scope.invitees.push(inviteeEmailAddress);
        console.log($scope.invitees);
        var email_field = document.getElementById("email_field");
        email_field.value = "";
        email_field.focus();
      };

      $scope.sendInvites = function(){
        for(var i = 0; i < $scope.invitees.length; i++){
          console.log("Sending invite to: " + $scope.invitees[i] + " (from controller)");
        }
        InvitePlayers.invitePlayers($scope.invitees);
      }; 

      $scope.remove = function(emailAddress) { 
        var index = $scope.invitees.indexOf(emailAddress);
        $scope.invitees.splice(index, 1);     
      };
  }])