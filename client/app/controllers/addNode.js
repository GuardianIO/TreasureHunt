angular.module('treasureHunt.addNode', ['treasureHunt.services'])

.controller('AddNode', ['$scope', '$location', 'SendPicAndLoc', '$interval', 
  function($scope, $location, SendPicAndLoc, $interval){
    //start requesting the user's location
    SendPicAndLoc.getLoc();
    $scope.file = null;
    var canvas = document.getElementById('editCanvas');
    var ctx = canvas.getContext('2d');
    
    $scope.status = {
      canUpload:false
    };

    $scope.$on('locReady', function(){
      // swap dummy button for Add Waypoint button with functionality
      $scope.$apply($scope.status.canUpload = true);
    });

    $scope.send = function(){
      if($scope.file){
        SendPicAndLoc.clue = $scope.clue;
        SendPicAndLoc.sendPic($scope.file, function(){
          $scope.file=null;
          $scope.clue='';
        });
      }
    };
    
    $scope.done = function(){
      if($scope.file){
        SendPicAndLoc.clue = $scope.clue;
        SendPicAndLoc.sendPic($scope.file, function(){
          $scope.file=null;
          $scope.clue='';
          $location.path('/invite');
        });
      }else{
       $location.path('/invite'); 
      }
    }

    $scope.createGame = function(){
      $location.path('/invite');
    }

    var draw = function(url, radians){
      var img = new Image;
      img.addEventListener('load', function(){
        console.log('image loaded:', img);
        ctx.drawImage(img, 0, 0);
      });
      img.src = url;
    }

    function b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, {type: contentType});
        return blob;
    }

    var drawRotated = function(url, radians){
      console.log('before rotate:', $scope.file.dataUrl);
      var img = new Image;
      img.addEventListener('load', function(){
        ctx.translate(500, 0);
        ctx.rotate(radians);
        
        ctx.drawImage(img, 0, 0);
        var url = canvas.toDataURL('image/jpeg');
        $scope.file = b64toBlob(url.slice(23), 'image/jpeg');
      })
      img.src = url;
      // console.log(url);
      
    };

    // $scope.$watch('file.dataUrl', function(url){
    //   if(url){
    //     draw(url);
    //   }
    // });
    $scope.rotateCW = function(){
      if($scope.file && $scope.file.dataUrl){
        drawRotated($scope.file.dataUrl, Math.PI/2);
      }
    };

}]);

