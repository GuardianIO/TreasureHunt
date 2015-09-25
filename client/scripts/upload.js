function uploadUsing$http(file) {
  file.upload = Upload.http({
    url: 'https://angular-file-upload-cors-srv.appspot.com/upload' + $scope.getReqParams(),
    method: 'POST',
    headers: {
      'Content-Type': file.type
    },
    data: file
  });

  file.upload.then(function (response) {
    file.result = response.data;
  }, function (response) {
    if (response.status > 0)
      $scope.errorMsg = response.status + ': ' + response.data;
  });

  file.upload.progress(function (evt) {
    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
  });
}