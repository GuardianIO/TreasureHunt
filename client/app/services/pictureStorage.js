angular.module('treasureHunt.pictureStorage', [])

.factory('PicStore', [function(){
  var files =[];
  return {
    pushEdit:function(file){
      if(files.length > 4){
        files.shift();
      }
      files.push(file);
    },
    popEdit:function(){
      return files.pop();
    }
  }
}])

.directive('imgLoaded', function(){
  return {
    link: function(scope, element, attrs){
      element.bind('load', function(e){
        scope.$apply(function(){
          scope.$broadcast('imgLoaded', e);
        })
      })
    }
  }
})

.directive('ngCanvas', function(){
  return {
    restrict:'E',
    link:function(scope, element, attrs){
      scope.canvas = element;
    }
  }
})