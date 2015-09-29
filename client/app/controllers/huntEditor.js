angular.module('fileMaster.huntEditor', ['ngFileUpload', 'fileMaster.services'])

.controller('HuntEditorCtrl', ['$scope', 'Upload', '$timeout', 'RequestFactory',
    function ($scope, Upload, $timeout, RequestFactory) {

    // $scope.$watch('files', function () {
    //     $scope.upload($scope.files);
    // });
    // $scope.$watch('file', function () {
    //     if ($scope.file != null) {
    //         $scope.upload([$scope.file]);
    //     }
    // });
    $scope.log = '';

    $scope.remove = function(item) { 
      var index = $scope.files.indexOf(item);
      console.log(item);
      $scope.files.splice(index, 1);     
    };

    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              console.log("Uploading " + file);
              if (!file.$error) {
                console.log('sending gameId ', RequestFactory.getGameId());
                Upload.upload({
                    url: '/upload',
                    file: file,
                    data:{ gameId : RequestFactory.getGameId() }
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $scope.log = 'progress: ' + progressPercentage + '% ' +
                                evt.config.file.name + '\n' + $scope.log;
                }).success(function (data, status, headers, config) {
                    $timeout(function() {
                        $scope.log = 'file: ' + config.file.name + ', Response: ' + JSON.stringify(data) + '\n' + $scope.log;
                    });
                });
              }
            }
        }
    };
}]);