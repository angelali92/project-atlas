angular.module('linkSpot')

    .controller('qrController', function($scope, $http) {
        var fetchBlob = function(uri, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', uri, true);
            xhr.responseType = 'arraybuffer';

            xhr.onload = function(e) {
                if(this.status == 200) {
                    var blob = this.response;
                    if(callback) {
                        callback(blob);
                    }
                }
            };
            xhr.send();
        };

        $scope.getData = function() {

            var url = 'http://api.qrcode.unitag.fr/api?t_pwd=degraded&T=PNG&setting={}&data={"DATA":{"EMAIL":"abc@123.com", "EMAIL_OBJ":"Hello", "EMAIL_CORPS":"What is this?"},"TYPE":"email"}';
            $scope.image = "temp";
            fetchBlob(url, function(blob) {
                str = String.fromCharCode.apply(null, new Uint8Array(blob));
                document.getElementById("qr-image").src = 'data:image/png;base64,' + btoa(str);
            });
        }

    });