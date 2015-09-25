angular.module('fileMaster', [
  'fileMaster.create',
  'fileMaster.huntEditor',
  'fileMaster.initial',
  'ngFileUpload',
  'ngRoute',
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
