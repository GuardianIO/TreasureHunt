angular.module('fileMaster', [
  'ngFileUpload',
  'ngRoute', 
  'fileMaster.create',
  'fileMaster.huntEditor',
  'fileMaster.initial'
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
  .otherwise({
    redirectTo:'/'
  })
});
