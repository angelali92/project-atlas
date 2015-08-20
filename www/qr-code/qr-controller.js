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
              console.log(data);
              console.log("$scope.image is: " + $scope.image);
          })
          .error(function(data) {
              alert("ERROR");
          });
    }
 
});