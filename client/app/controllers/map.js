angular.module('treasureHunt.map', ['ngMap', 'ui.router', 'treasureHunt.services'])
.controller('MapCtrl', ['$scope', '$location','$state', '$interval', 'SendPicAndLoc',
  function($scope, $location, $state, $interval, SendPicAndLoc){

  $scope.initializeMap = function(){
    if(navigator&&navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(pos){
        var coords = pos.coords;
        var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: coords.latitude, lng: coords.longitude},
            scrollwheel: true,
            zoom: 15
          });
        var myMarker;
        function placeMarker(location) {
          if(location){
            $scope.userCoords.latitude = location.J;
            $scope.userCoords.longitude = location.M;
          }
          if ( myMarker ) {
            myMarker.setPosition(location);
          } else {
            myMarker = new google.maps.Marker({
              position: location,
              map: map,
              draggable: true
            });
          }
        };

        placeMarker({lat: coords.latitude, lng: coords.longitude});

        myMarker.setPosition(map.getCenter());

        google.maps.event.addListener(map, 'click', function(event) {
              console.log(event.latLng);
              placeMarker(event.latLng);
            }); 
        map.setCenter(myMarker.position);
        myMarker.setMap(map);

        $scope.map = map;

        $scope.watchPosition = navigator.geolocation.watchPosition(function(loc){
          if($scope.map && !$scope.$parent.mapShow){
            console.log('map center');
            $scope.map.setCenter(new google.maps.LatLng(loc.coords.latitude, loc.coords.longitude));            
          }
        });
      }); 
    }
  };

  var interval = $interval(function(){
    var map = $('#map')
    if(map){
      google.maps.event.trigger(document.getElementById('map'), 'resize');
    }else{
      $interval.cancel(interval);
    }
  },300);

  $scope.$on('$destroy', function(){
    $interval.cancel(interval);
    navigator.geolocation.clearWatch($scope.watchPosition);
  })

  $scope.setCoordinates = function(){
    $scope.$parent.mapShow = !$scope.$parent.mapShow;
    SendPicAndLoc.loc = {
      coords:{
        latitude:$scope.userCoords.latitude,
        longitude:$scope.userCoords.longitude,
        accuracy:1,
        timestamp:Date.now()
      }
    };
  }

}]);