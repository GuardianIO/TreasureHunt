angular.module('treasureHunt', [
  'ngFileUpload',
  'ui.router',
  "treasureHunt.map", 
  'treasureHunt.create',
  'treasureHunt.userAuth',
  'treasureHunt.nodeEditor',
  'treasureHunt.initial',
  'treasureHunt.games',
  'treasureHunt.game',
  'treasureHunt.addNode',
  'treasureHunt.invite',
  'treasureHunt.gameInfo',
  'treasureHunt.map',
  'treasureHunt.about',
  'treasureHunt.editGame',
  'treasureHunt.myGames',
  'treasureHunt.tutorial'
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
    .state('create', {
      url:'/create',
      templateUrl: mobileBrowser ? 'app/views/mobile/create.html' : 'app/views/desktop/create.html',
      controller:'CreateCtrl'
    })
    .state('nodeEditor', {
      url:'/nodeEditor',
      templateUrl: mobileBrowser ? 'app/views/mobile/nodeEditor.html' : 'app/views/desktop/nodeEditor.html',
      controller:'NodeEditorCtrl'
    })
    .state('addNode', {
      url:'/addNode?{state}&{gameId}',
      views:{
        '':{
          templateUrl: mobileBrowser ? 'app/views/mobile/addNode.html' : 'app/views/desktop/addNode.html',
          controller:'AddNode'
        },
        'map@addNode':{
          templateUrl: 'app/views/mobile/map.html',
          controller: 'MapCtrl'
        }
      }
    })
    .state('nodeList', {
      url:'/nodeList',
      templateUrl: mobileBrowser ? 'app/views/mobile/nodeList.html' : 'app/views/desktop/nodeList.html',
      controller: 'NodeListCtrl'
    })
    .state('invite', {
      url:'/invite',
      templateUrl: 'app/views/desktop/invite.html',
      controller: 'InviteCtrl'
    })
    .state('games', {
      url:'/games',
      templateUrl: mobileBrowser ? 'app/views/mobile/games.html' : 'app/views/desktop/games.html',
      controller: 'GamesCtrl'
    })
    .state('game', {
      url:'/game/{id}',
      templateUrl: 'app/views/mobile/game.html',
      controller: 'GameCtrl'
    })
    .state('gameInfo',{
      url:'/gameInfo/{id}',
      templateUrl: mobileBrowser ? 'app/views/mobile/gameInfo.html' : 'app/views/desktop/gameInfo.html',
      controller: 'GameInfoCtrl'
    })
    .state('about', {
      url: '/about',
      templateUrl: mobileBrowser ? 'app/views/mobile/about.html' : 'app/views/desktop/about.html',
      controller: 'AboutCtrl'
    })
    .state('editGame', {
      url:'/editGame/{id}',
      templateUrl: 'app/views/mobile/editGame.html',
      controller: 'EditGameCtrl'
    })
    .state('myGames', {
      url:'/myGames',
      templateUrl: mobileBrowser ? 'app/views/mobile/myGames.html' : 'app/views/desktop/myGames.html',
      controller: 'myGamesCtrl'
    })
    .state('tutorial', {
      url:'/tutorial',
      templateUrl: mobileBrowser ? 'app/views/mobile/tutorial.html' : 'app/views/desktop/tutorial.html',
      controller: 'tutorialCtrl'
    })
}]);
