angular.module('treasureHunt.about', [])

.controller('AboutCtrl', ['$scope', '$location', 'RequestFactory', function($scope, $location, RequestFactory){
  var vm = this;
  vm.developers = function(){
    RequestFactory.getCreatorsData(function(data){
      vm.creators = data;
      for(var i = 0; i < vm.creators.length; i++){
        if(vm.creators[i].userName === "cindy"){
          vm.creators[i].name = "Cindy Cheung";
          vm.creators[i].img = "img/cindy.png";
          vm.creators[i].github = "https://github.com/ccheung0926";
          vm.creators[i].position = "Full Stack Developers";
          vm.creators[i].linkedin = "https://www.linkedin.com/in/cindyzinyicheung";
        }
        if(vm.creators[i].userName === "jim"){
          vm.creators[i].name = "James Harlan";
          vm.creators[i].img = "img/jimbo2.png";
          vm.creators[i].github = "https://github.com/codeCommode";
          vm.creators[i].position = "Product Owner/Full Stack Developers";
          vm.creators[i].linkedin = "https://www.linkedin.com/in/highfalootin";
        }
        if(vm.creators[i].userName === "thomas"){
          vm.creators[i].name = "Thomas Butman";
          vm.creators[i].img = "img/thomas5.png";
          vm.creators[i].github = "https://github.com/tbutman";
          vm.creators[i].position = "Scrum Master/Full Stack Developers";
          vm.creators[i].linkedin = "https://www.linkedin.com/in/thomasbutman";
        }
        if(vm.creators[i].userName === "zhao"){
          vm.creators[i].name = "Zhao Zhan";
          vm.creators[i].img = "img/zhao1.png";
          vm.creators[i].github = "https://github.com/zzhan223";
          vm.creators[i].position = "Full Stack Developers";
          vm.creators[i].linkedin = "https://www.linkedin.com/in/zzhan";
        }
      }
    });
  }
}]);