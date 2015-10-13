angular.module('treasureHunt.leader', ['treasureHunt.macaService'])
.controller('leaderCtrl', ['$scope', '$state', 'Macadamia', 
function($scope, $state, Macadamia){
  $scope.leaders;

  $scope.getLeaders = function(){
    Macadamia.getLeaders().then(function(res){
      if(res.data.error){
        console.error(res.data.error);
      }else{
        $scope.leaders = res.data;
        console.log('data: ',res.data);
      }
    })
  };
  $scope.userProfile = function(userName){
    $state.go('user', {id:userName})
    console.log(userName);
  }
}]);