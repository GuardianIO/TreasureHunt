angular.module('fileMaster', [
  'ngFileUpload',
  'ngRoute', 
  'fileMaster.create',
  'fileMaster.huntEditor',
  'fileMaster.initial',
  'fileMaster.singleNode'
])

.config(function($routeProvider){
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
  .otherwise({
    redirectTo:'/'
  })
});
