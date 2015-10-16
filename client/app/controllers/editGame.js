angular.module('treasureHunt.editGame', ['treasureHunt.services'])
  .controller('EditGameCtrl', [ '$scope', '$location', '$state', '$timeout', 'RequestFactory', 
    function( $scope, $location, $state, $timeout, RequestFactory ){
    var gameId = $location.url().split('/').pop();

    $scope.gameToEdit = {};
    $scope.ngfxEnabled = true;

    $scope.getGame = function(){
      RequestFactory.getEditGame(gameId, function(game){
        $scope.gameToEdit = game;
      });
      console.log("edit game " + gameId);
    };

    $scope.removeNode = function(node){
      var nodes = $scope.gameToEdit.nodes;

      nodes.splice(nodes.indexOf(node), 1);
    };

    $scope.cancel = function(){
      $state.go('gameInfo', {id: gameId});
    };

    $scope.insertNode = function(node, index){
      var nodes = $scope.gameToEdit.nodes;

      nodes.splice(index, 0, node);
    }

    $scope.moveNodeUp = function(node){
      var nodes = $scope.gameToEdit.nodes;
      var currentIndex = nodes.indexOf(node);

      if(currentIndex === 0){
        return;
      }
      $scope.removeNode(node);
      $scope.insertNode(node, currentIndex - 1);
    };

    $scope.moveNodeDown = function(node){
      var nodes = $scope.gameToEdit.nodes;
      var currentIndex = nodes.indexOf(node);

      if(currentIndex === nodes.length - 1){
        return;
      }
      $scope.removeNode(node);
      $scope.insertNode(node, currentIndex + 1);
    };

    $scope.nodeCantBeMoved = function(node, direction){
      var nodes = $scope.gameToEdit.nodes;
      var currentIndex = nodes.indexOf(node);
      console.log(currentIndex)
      var nonAllowedPositions = {
        up: 0,
        down: nodes.length - 1
      };

      return (currentIndex == nonAllowedPositions[direction]);
    };

    $scope.updateGame = function(){
      RequestFactory.updateGame($scope.gameToEdit)
      .then( function(results){
        $state.go('myGames');
      }, function(err){
        console.log(err);
      });
   };

   $scope.addNode = function(){
    RequestFactory.setGameId(gameId);
    console.log('gameid:',gameId)
    $state.go('addNode', { state: 'editGame', gameId: gameId });
   };

   $scope.disableNgfx = function(){
    $timeout(function(){
      $scope.ngfxEnabled = false;
    }, 500);
   };
}]);