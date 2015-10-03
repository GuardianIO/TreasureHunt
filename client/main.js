angular.module('treasureHunt.services', ['ngFileUpload', 'ngCookies'])
.factory('RequestFactory', ['$http', '$location', function($http, $location){
  var gameId = "";
  var games = [];
  var currentGame = {};

  gameSetup = function(){
    if(Array.isArray(currentGame.nodes)){
      currentGame.nodes.forEach(function(node){
        node.found=false;
      });
    }
  };

  return {
    gameId : gameId,
    getGameId : function(){
      return gameId;
    },
    postNewGame: function(gameName, gameDescription){
      $http.post('/createGame', { gameName: gameName, gameDescription: gameDescription })
        .then( function(resp){
          gameId = resp.data.gameId;
          console.log("Game created with ID: " + gameId);
        }, function(err){
          console.error('Error ',err);
        });        
    },

    getGames: function(){
      return $http.post('/games').then(function(resp){
        return resp.data;
      });
    },
    getGame:function(gameId, cb){
      $http.post('/game', {
        gameId:gameId
      })
      .then(function(results){
        if(results.data.length){
          currentGame = {
            name:results.data[0].gameName,
            description: results.data[0].description,
            nodes:results.data
          };
          gameSetup();
        }
        cb(currentGame.nodes.length);
      }, function(err){
        console.error(err);
      })
    }, 
    getGameInfo: function(gameId, cb){
      $http.post('/gameInfo', {
        gameId:gameId
      })
        .then(function(results, err){
          cb(results);
        },function(err){
          console.error(err);
        })
    },
    getNode:function(nodeNum){
      if(currentGame.nodes){
        return currentGame.nodes[nodeNum];
      }
      return null;
    },
    getLastGame: function(gameId, cb){
      return currentGame;
    }
  }
}])

.factory('SendPicAndLoc', ['$rootScope', '$http', '$location', 'Upload', 'RequestFactory',
  function($rootScope, $http, $location, Upload, RequestFactory){

    function postPic(file, loc, clue, cb){
      Upload.upload({
        url:'/addWaypoint',
        file: file,
        data:{
          gameId : RequestFactory.getGameId(),
          latitude : loc.coords.latitude,
          longitude : loc.coords.longitude,
          clue: clue
        }})
        .success(function(data, status, headers, config){
          cb();
          console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
        })
        .error(function(data, status, headers, config){
          console.log('error status: ', status);
        })
    };

    return {
      loc:null,
      clue:'',
      getLoc:function(){
        if(navigator && navigator.geolocation){
          navigator.geolocation.getCurrentPosition(function(data){
            this.loc = data;
            $rootScope.$broadcast('locReady');
          }.bind(this), 
          function(err){
            console.error(err);
          }, {
            enableHighAccuracy:true
          }
          )
        }
      },
      sendPic:function(file, cb){
        postPic(file, this.loc, this.clue,cb);
      }
    };
}])

// invitePlayers method will submit post request to '/invite' with array of invities and server will email each invitee
.factory('InvitePlayers', ['$http', '$location', 'RequestFactory', function($http, $location, RequestFactory){
  return {
    invitePlayers: function(arrayOfEmailAddresses){
      console.log(arrayOfEmailAddresses + " in invite players");
      $http.post('/invite', { inviteeEmailAddresses: arrayOfEmailAddresses, gameId: RequestFactory.getGameId() })
        .then(function(resp){
          // on success
          
        }, function(resp){
          // on failure
          console.log(resp.data);
        })
    }
  };
}])

.factory('geo', [function(){
  return {
    distance:function(lat1, lon1, lat2, lon2){
      /* implemented from https://en.wikipedia.org/wiki/Great-circle_distance */
      var c = Math.PI/180;
      lat1 = lat1*c;
      lat2 = lat2*c;
      lon1 = lon1*c;
      lon2 = lon2*c;
      return 6371000 * 2 * Math.asin(Math.sqrt(
          Math.sin((lat2-lat1) / 2) * Math.sin((lat2-lat1) / 2) + Math.cos(lat1)*Math.cos(lat2)*
          Math.sin((lon2-lon1) / 2) * Math.sin((lon2-lon1) / 2)
        ));
    },
  };
}]);





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
      if($scope.file){
        SendPicAndLoc.sendPic($scope.file);
      }
    };

    $scope.createGame = function(){
      $location.path('/invite');
    }
}]);
angular.module('treasureHunt.create', ['treasureHunt.services'])

.controller('CreateCtrl', ['$scope', '$http', '$state','RequestFactory',
  function($scope, $http, $state, RequestFactory){

  $scope.createGame = function(gameName, gameDescription){
    console.log("sending to server to create game");
    RequestFactory.postNewGame(gameName, gameDescription);
    $state.go('/addNode');
  }
}]);

//
angular.module('treasureHunt.finishGame',['treasureHunt.services'])

.controller('FinishGameCtrl', ['$scope','RequestFactory', '$location', function($scope, RequestFactory, $location){
  var vm = this;
  vm.gameId = $location.url().split('/').pop();
  vm.lastGame = RequestFactory.getLastGame();
  console.log(vm.lastGame);

  $scope.finishLine = function(){
  }
}]);
angular.module('treasureHunt.game', ['treasureHunt.services', 'ngCookies'])
.controller('GameCtrl', ['$scope', '$location', '$interval', 'RequestFactory', '$q', 'geo', '$cookies', 
  function($scope, $location, $interval, RequestFactory, $q, geo, $cookies){
    $scope.clue = '';
    $scope.gameLength;
    $scope.currentNode = {};
    $scope.distance = NaN;
    var interval;

    function searching(notFound){
      if(notFound){
        interval = $interval(function(){
          navigator.geolocation.getCurrentPosition(checkCoords, function(err){
            console.error(err)
          },
            {
              enableHighAccuracy:true
            }
          );
        }, 1000);
      }else{
        $interval.cancel(interval);
      }
    };

    $scope.next = function(){
      searching(false);
      $scope.currentNode = RequestFactory.getNode($scope.currentNode.nodeId);
      searching(true);
    };

    $scope.prev = function(){
      searching(false);
      if($scope.currentNode.nodeId - 1){
        $scope.currentNode = RequestFactory.getNode($scope.currentNode.nodeId-2);
      }
    }
    
    nodeFound = function(){
      $scope.currentNode.found = true;
      if($scope.currentNode.nodeId === $scope.gameLength){
        console.log('Congrats!');
        $location.path('/finishGame');
      }
    };

    checkCoords = function(data){
      $scope.$apply(function(){
        var coords = data.coords;
        var distance = geo.distance(coords.latitude, coords.longitude, $scope.currentNode.lat, $scope.currentNode.lon);
        $scope.distance = distance;
        if(distance < 25){
          nodeFound();
        }else{
          console.log(distance);
        }
      });
    };

    (function(){
      var gameId = $location.url().split('/').pop();
      if(gameId){
        RequestFactory.getGame(gameId, function(numNodes){
          $scope.gameLength = numNodes;
          if(numNodes){
            $scope.currentNode = RequestFactory.getNode(0);
          }
          searching(true);
        });
      }
    })();

}]);
angular.module('treasureHunt.gameInfo',['treasureHunt.services'])

.controller('GameInfoCtrl', ['$scope','RequestFactory', '$location', function($scope, RequestFactory, $location){
  var vm = this;
  vm.gameId = $location.url().split('/').pop();
  $scope.startGame = function(){
    RequestFactory.getGameInfo(vm.gameId,function(game){
      $scope.game = game.data[0];
      console.log('get game', $scope.game);
    });
  }
  $scope.playGame = function(){
    $location.path('/game/'+vm.gameId);
  }
}]);
angular.module('treasureHunt.games',['treasureHunt.services'])
.controller('GamesCtrl', ['$scope', '$location', 'RequestFactory',
  function($scope, $location, RequestFactory){
    $scope.games=[];
    $scope.getAllGames = function(){
      RequestFactory.getGames().then(function(resp){
        $scope.games = resp;
      });
    };

    $scope.gameInfo = function(gameId){
      console.log(gameId);
      $location.path('/gameInfo/'+gameId);
    };
}]);
angular.module('treasureHunt.nodeEditor', ['ngFileUpload', 'treasureHunt.services'])


.controller('NodetEditorCtrl', ['$scope', '$location', 'Upload', '$timeout', 'RequestFactory',
    function ($scope, $location, Upload, $timeout, RequestFactory) {
    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });
    $scope.$watch('file', function () {
        if ($scope.file != null) {
            $scope.upload([$scope.file]);
        }
    });
    $scope.log = '';

    $scope.remove = function(item) { 
      var index = $scope.files.indexOf(item);
      console.log(item);
      $scope.files.splice(index, 1);     
    };

    $scope.addWaypoint = function(){
      $location.path = '/addWaypoint';
    };

    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              console.log("Uploading " + file);
              if (!file.$error) {
                console.log('sending gameId ', RequestFactory.getGameId());
                Upload.upload({
                    url: '/upload',
                    file: file,
                    data:{ gameId : RequestFactory.getGameId() }
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $scope.log = 'progress: ' + progressPercentage + '% ' +
                                evt.config.file.name + '\n' + $scope.log;
                }).success(function (data, status, headers, config) {
                    $timeout(function() {
                        $scope.log = 'file: ' + config.file.name + ', Response: ' + JSON.stringify(data) + '\n' + $scope.log;
                    });
                });
              }
            }
        }
    };
}]);
angular.module('treasureHunt.initial', [])

.controller('InitialCtrl', ['$scope', '$location',  function($scope, $location){
  $scope.join = function(){
    $location.path('/games');
  };
  $scope.create = function(){
    $location.path('/create');
  }
}]);
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
angular.module('treasureHunt.nodeList', [])

.controller('NodeListCtrl', ['$scope','NodeList', function($scope){
  //code here
}]);
angular.module('treasureHunt', [
  'ngFileUpload',
  'ui.router', 
  'treasureHunt.create',
  'treasureHunt.nodeEditor',
  'treasureHunt.initial',
  'treasureHunt.games',
  'treasureHunt.game',
  'treasureHunt.addNode',
  'treasureHunt.invite',
  'treasureHunt.gameInfo',
  'treasureHunt.finishGame'
])

.config(['$stateProvider', '$urlRouterProvider', 
  function($stateProvider, $urlRouterProvider){
  var mobileBrowser = false;
  (function(a,b){
    if(/* RegExp from detectmobilebrowsers.com to detect mobile browsers */
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))
    ){
      mobileBrowser = true;
  }})(navigator.userAgent||navigator.vendor||window.opera);
  
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('/',{
      url:'/',
      templateUrl: mobileBrowser ? 'app/views/mobile/initial.html' : 'app/views/desktop/initial.html',
      controller:'InitialCtrl'
    })
    .state('/create', {
      url:'/create',
      templateUrl: mobileBrowser ? 'app/views/mobile/create.html' : 'app/views/desktop/create.html',
      controller:'CreateCtrl'
    })
    .state('/nodeEditor', {
      url:'/nodeEditor',
      templateUrl: mobileBrowser ? 'app/views/mobile/nodeEditor.html' : 'app/views/desktop/nodeEditor.html',
      controller:'NodeEditorCtrl'
    })
    .state('/addNode', {
      url:'/addNode',
      templateUrl: mobileBrowser ? 'app/views/mobile/addNode.html' : 'app/views/desktop/addNode.html',
      controller:'AddNode'
    })
    .state('/nodeList', {
      url:'/nodeList',
      templateUrl: mobileBrowser ? 'app/views/mobile/nodeList.html' : 'app/views/desktop/nodeList.html',
      controller: 'NodeListCtrl'
    })
    .state('/invite', {
      url:'/invite',
      templateUrl: 'app/views/desktop/invite.html',
      controller: 'InviteCtrl'
    })
    .state('/games', {
      url:'/games',
      templateUrl: mobileBrowser ? 'app/views/mobile/games.html' : 'app/views/desktop/games.html',
      controller: 'GamesCtrl'
    })
    .state('/game/:id', {
      url:'/game/:id',
      templateUrl: 'app/views/mobile/game.html',
      controller: 'GameCtrl'
    })
    .state('/gameInfo/:id',{
      url:'/gameInfo/:id',
      templateUrl: mobileBrowser ? 'app/views/mobile/gameInfo.html' : 'app/views/desktop/gameInfo.html',
      controller: 'GameInfoCtrl'
    })
    .state('/finishGame', {
      url: '/finishGame',
      templateUrl: mobileBrowser ? 'app/views/mobile/finish.html' : 'app/views/desktop/finish.html',
      controller: 'FinishGameCtrl'
    })
}]);
