angular.module('treasureHunt', [
  'ngFileUpload',
  'ngRoute', 
  'treasureHunt.create',
  'treasureHunt.huntEditor',
  'treasureHunt.initial',
  'treasureHunt.singleNode'
])

.config(['$routeProvider', '$locationProvider', 
  function($routeProvider, $locationProvider){
  $routeProvider
  .when('/create', {
    templateUrl:'app/views/create.html',
    controller:'CreateCtrl'
  })
  .when('/huntEditor', {
    templateUrl:'app/views/huntEditor.html',
    controller:'HuntEditorCtrl'
  })
  .when('/',{
    templateUrl:'/app/views/initial.html',
    controller:'InitialCtrl'
  })
  .when('/addSingleNode', {
    templateUrl:'app/views/addSingleNode.html',
    controller:'AddSingleNodeCtrl'
  })
  .when('/nodeList', {
    templateUrl: '/app/views/nodeList.html',
    controller: 'NodeListCtrl'
  })
  .otherwise({
    redirectTo:'/'
  })

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

}]);
