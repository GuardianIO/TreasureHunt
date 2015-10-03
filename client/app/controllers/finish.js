angular.module('treasureHunt.finishGame',['treasureHunt.services'])

.controller('FinishGameCtrl', ['$scope','RequestFactory', '$location', function($scope, RequestFactory, $location){
  var vm = this;
  vm.gameId = $location.url().split('/').pop();
  $scope.document = document;
  $scope.script = "script";
  $scope.facebook = "facebook-jssdk";

  $scope.currentGame = RequestFactory.currentGame;
  console.log($scope.currentGame);
  $scope.finishLine = function(){
    // $scope.lastGame = RequestFactory.getLastGame();
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  };
}]);