angular.module('fileMaster.huntEditor', [])

.controller('HuntEditorCtrl', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });
    $scope.$watch('file', function () {
        if ($scope.file != null) {
            $scope.upload([$scope.file]);
        }
    });
    $scope.log = '';

    $scope.remove = function(item) { 
      var index = $scope.files.indexOf(item);
      $scope.files.splice(index, 1);     
    };

// TODO: upload() function should be refactored into a service
    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              console.log("Uploading " + file.name);
              if (!file.$error) {
                Upload.upload({
                    url: '/upload',
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $scope.log = 'progress: ' + progressPercentage + '% ' +
                                evt.config.file.name + '\n' + $scope.log;
                }).success(function (data, status, headers, config) {
                    console.log("JSON.stringify(data): "+ JSON.stringify(data));
                    console.log("config.file.name: " + config.file.name)
                    $timeout(function() {
                        $scope.log = 'file: ' + config.file.name + ', Response: ' + JSON.stringify(data) + '\n' + $scope.log;
                    });
                });
              }
            }
        }
    };
}]);