angular.module('treasureHunt.addNode', ['treasureHunt.services', 'treasureHunt.pictureStorage', 'ngImgCrop', 'ui.router'])

.controller('AddNode', ['$scope', '$location', 'SendPicAndLoc', '$interval', 'PicStore', '$state',
  function($scope, $location, SendPicAndLoc, $interval, PicStore, $state){
    //start requesting the user's location
    $scope.myCroppedImage = '';
    $scope.canSend = false;
    $scope.mapShow = false;
    $scope.userCoords = {};
    $scope.canvasURI = null;

    function drawCanvas(canvas, ctx, img){
       var hRatio = canvas.width  / img.width    ;
       var vRatio =  canvas.height / img.height  ;
       var ratio  = Math.min ( hRatio, vRatio );
       var centerShift_x = ( canvas.width - img.width*ratio ) / 2;
       var centerShift_y = ( canvas.height - img.height*ratio ) / 2;  
       ctx.clearRect(0,0,canvas.width, canvas.height);
       ctx.drawImage(img, 0,0, img.width, img.height,
                          centerShift_x,centerShift_y,img.width*ratio, img.height*ratio);
       $scope.canvasURI = canvas.toDataURL('image/jpeg');
    };

    function clearCanvas(){
      var canvas = document.getElementById('canvas');
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0,0,canvas.width, canvas.height);
    };

    $scope.drawInitial = function(){
      var canvas = document.getElementById('canvas');
      var ctx = canvas.getContext('2d');
      canvas.width = 500;
      canvas.height = 500;
      var img = new Image();
      img.onload = function(){
        drawCanvas(canvas, ctx, img);
      }
      img.src = '/img/photo-placeholder.jpg';
    };

    $scope.getManualLocation = function(){
      $scope.mapShow = !$scope.mapShow;
      google.maps.event.trigger(document.getElementById('map'), 'resize');
    };
    
    SendPicAndLoc.getLoc();
    
    $scope.status = {
      canUpload:false
    };

    $scope.getFile = function(){
      $('#fileInput').click();
    };

    $scope.$watch('userFile', function(){
      $scope.canSend = true;
      $scope.$broadcast('fileReady');
    })

    $scope.$on('fileReady', function(){
      if($scope.userFile && document.getElementById('canvas')){
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');

        canvas.width = 500;
        canvas.height = 500;

        var img = new Image();
        img.addEventListener('load', function(){
          drawCanvas(canvas, ctx, img);
        });
        img.src = $scope.userFile;
      }
    });

    $scope.$on('locReady', function(){
      // swap dummy button for Add Waypoint button with functionality
      $scope.$apply($scope.status.canUpload = true);
    });

    $scope.send = function(){
      if($scope.canvasURI){
        SendPicAndLoc.clue = $scope.clue;
        var blob = PicStore.b64toBlob($scope.canvasURI.slice($scope.canvasURI.indexOf(',')+1), 'image/jpeg');
        SendPicAndLoc.sendPic(blob, function(){
          $scope.canSend = false;
          $scope.canvasURI=null;
          $scope.clue='';
          clearCanvas();
        });
      }
    };
    
    $scope.done = function(){
      if($scope.canvasURI){
        SendPicAndLoc.clue = $scope.clue;
        var blob = PicStore.b64toBlob($scope.canvasURI.slice($scope.canvasURI.indexOf(',')+1), 'image/jpg');
        SendPicAndLoc.sendPic(blob, function(){
          $scope.canvasURI=null;
          $scope.clue='';
          clearCanvas();
          $state.go('invite');
        });
      }else{
       $state.go('invite'); 
      }
    }

    $scope.createGame = function(){
      $state.go('invite');
    }

    var drawRotated = function(url, radians){
      if($scope.canvasURI && document.getElementById('canvas')){
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        var img = new Image;
        img.addEventListener('load', function(){
          ctx.save();
          ctx.translate(Math.sin(radians/2 + Math.PI/4)*500, Math.cos(radians/2 + Math.PI/4)*500);
          ctx.rotate(radians);
          drawCanvas(canvas, ctx, img);
          ctx.restore();
        })
        img.src = url;
      }
    };

    $scope.rotateCW = function(){
      if($scope.canvasURI){
        drawRotated($scope.canvasURI, Math.PI/2);
      }
    };

    $scope.rotateCCW = function(){
      if($scope.canvasURI){
        drawRotated($scope.canvasURI, -Math.PI/2);
      }
    }

    $scope.crop = function(){

      var canvas = document.getElementById('canvas');
      var ctx = canvas.getContext('2d');

      $scope.canvasURI = $scope.myCroppedImage;
      var img = new Image();
      img.addEventListener('load', function(){
        drawCanvas(canvas, ctx, img);
        $('#cropModal').modal('toggle');
      });
      img.src = $scope.canvasURI;
    };

}]);

