angular.module('linkSpot')

  .controller('qrController', function($scope, $http) {
 
    $scope.getData = function() {
        // $http({
        //   method: 'GET',
        //   url: "http://api.qrcode.unitag.fr/api",
        //   headers: {'Content-Type': 'text/plain'} 
        // })
        $http.get("http://api.qrcode.unitag.fr/api", 
          { 
            params: 
              { 
                "t_pwd": "degraded", 
                "setting": {},
                "data":  {
                  "DATA": {"TEXT": "Hello"},
                  "TYPE": "text"
                }
              } 
          })
          .success(function(data) {
              console.log("success");
              $scope.image = data;
              // var file = new Blob([data], {type: 'image/png'});
              // saveAs(file, "qrcode.png");
              // console.log(data);
              // console.log("$scope.image is: " + $scope.image);
              // http://iswwwup.com/t/004d362961e5/display-png-with-raw-image-data-within-an-html-document-using-php.html
          })
          .error(function(data) {
              alert("ERROR");
          });
    }
 
});