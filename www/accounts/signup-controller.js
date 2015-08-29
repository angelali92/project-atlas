angular.module('linkSpot')
	.controller('SignupController', ['$scope', '$state', function($scope, $state) {

	    $scope.signUp = function(submittedForm) {

	    	if (submittedForm.password === submittedForm.passwordConfirm) {
		    	function authHandler(error, authData) {
		            if (error) {
		                alert("Signup Failed", error);
		            } else {
		                alert("Authenticated successfully with payload " + authData.uid, authData.uid);
		                ref.authWithPassword({
				            "email": submittedForm.email,
				            "password": submittedForm.password  
		        		}, function(authData) {
		        			
	        				var newUserAuth = ref.getAuth();

	            			var url = 'http://api.qrcode.unitag.fr/api?t_pwd=degraded&T=PNG&setting={"LAYOUT":{"COLORBG":"ffffff","GRADIENT_TYPE":"DIAG1","COLOR1":"872BE3", "COLOR2":"DCC7F2"},"EYES":{"EYE_TYPE":"ECurve_ICurve"},"BODY_TYPE":1,"ARRONDI":7}';
	            			url += '&data={"DATA":{"TEXT":"' + newUserAuth.uid + '"},"TYPE":"text"}';

	        				fetchQRCode(url, function(imageCode) {
								ref.child('people').child(newUserAuth.uid).set({
			                		email: newUserAuth.password.email,
			                		qrCode: imageCode
		                		});
		                		document.getElementById("qr-image").src = imageCode;
	        				});
		                	
		        		});
		               
		                // $state.go('tabs.list');
		            }
		    	}

		        var ref = new Firebase("https://linkspot.firebaseIO.com/");
		        ref.createUser({
		        	"name": submittedForm.name,
		            "email": submittedForm.email,
		            "password": submittedForm.password  
		        }, authHandler)
	    	} else {
	    		return alert("Passwords need to match")
	    	}


	    }

	    // TAKEN FROM QR CODE CONTROLLER. MAY NEED TO REFACTOR.
	    var fetchQRCode = function(uri, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', uri, true);
            xhr.responseType = 'arraybuffer';

            xhr.onload = function(e) {
                if(this.status == 200) {
                    var blob = this.response;
                    var str = String.fromCharCode.apply(null, new Uint8Array(blob));
                    var imageCode = 'data:image/png;base64,' + btoa(str);
                    if(callback) {
                        callback(imageCode);
                    }
                }
            };
            xhr.send();
        };

	}]);