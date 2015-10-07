angular.module('treasureHunt.addNode', ['treasureHunt.services', 'treasureHunt.pictureStorage', 'ngImgCrop'])

.controller('AddNode', ['$scope', '$location', 'SendPicAndLoc', '$interval', 'PicStore',
  function($scope, $location, SendPicAndLoc, $interval, PicStore){
    //start requesting the user's location
    $scope.myCroppedImage = '';
    function drawCanvas(canvas, ctx, img){
       var hRatio = canvas.width  / img.width    ;
       var vRatio =  canvas.height / img.height  ;
       var ratio  = Math.min ( hRatio, vRatio );
       var centerShift_x = ( canvas.width - img.width*ratio ) / 2;
       var centerShift_y = ( canvas.height - img.height*ratio ) / 2;  
       ctx.clearRect(0,0,canvas.width, canvas.height);
       ctx.drawImage(img, 0,0, img.width, img.height,
                          centerShift_x,centerShift_y,img.width*ratio, img.height*ratio);
    };

    function clearCanvas(){
      var canvas = document.getElementById('canvas');
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0,0,canvas.width, canvas.height);
    };
    
    SendPicAndLoc.getLoc();
    $scope.file = null;
    
    $scope.status = {
      canUpload:false
    };

    $scope.getFile = function(){
      $('#fileInput').click();
    };

    $scope.$watch('file', function(){
      $scope.$broadcast('fileReady');
    })

    $scope.$on('fileReady', function(){
      if($scope.file && document.getElementById('canvas')){
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');

        canvas.width = 500;
        canvas.height = 500;

        var img = new Image();
        img.addEventListener('load', function(){
          drawCanvas(canvas, ctx, img);
        });
        img.src = $scope.file;
      }
    });

    $scope.$on('locReady', function(){
      // swap dummy button for Add Waypoint button with functionality
      $scope.$apply($scope.status.canUpload = true);
    });

    $scope.send = function(){
      if($scope.file){
        SendPicAndLoc.clue = $scope.clue;
        var blob = PicStore.b64toBlob($scope.file.slice(23), 'image/jpeg');
        SendPicAndLoc.sendPic(blob, function(){
          $scope.file=null;
          $scope.clue='';
          clearCanvas();
        });
      }
    };
    
    $scope.done = function(){
      if($scope.file){
        SendPicAndLoc.clue = $scope.clue;
        var blob = PicStore.b64toBlob($scope.file.slice(23), 'image/jpeg');
        SendPicAndLoc.sendPic(blob, function(){
          $scope.file=null;
          $scope.clue='';
          clearCanvas();
          $location.path('/invite');
        });
      }else{
       $location.path('/invite'); 
      }
    }

    $scope.createGame = function(){
      $location.path('/invite');
    }

    var drawRotated = function(url, radians){
      if($scope.file && document.getElementById('canvas')){
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        var img = new Image;
        img.addEventListener('load', function(){
          ctx.translate(Math.sin(radians/2 + Math.PI/4)*500, Math.cos(radians/2 + Math.PI/4)*500);
          ctx.rotate(radians);
          drawCanvas(canvas, ctx, img);
          var url = canvas.toDataURL('image/jpeg');
          $scope.file = url;
        })
        img.src = url;
      }
    };

    $scope.rotateCW = function(){
      if($scope.file){
        drawRotated($scope.file, Math.PI/2);
      }
    };

    $scope.rotateCCW = function(){
      if($scope.file){
        drawRotated($scope.file, -Math.PI/2);
      }
    }

    $scope.crop = function(){
      // console.log('crop');
      var canvas = document.getElementById('canvas');
      var ctx = canvas.getContext('2d');
      
      $scope.file = $scope.myCroppedImage;
      var img = new Image();
      img.addEventListener('load', function(){
        drawCanvas(canvas, ctx, img);
      });
      img.src = $scope.file;
    }

}]);

