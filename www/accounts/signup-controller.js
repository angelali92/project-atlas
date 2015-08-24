angular.module('linkSpot')
	.controller('SignupController', ['$scope', '$state', function($scope, $state) {

	    $scope.signUp = function(submittedForm) {

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

	                	ref.child('people').child(newUserAuth.uid).set({
	                		email: newUserAuth.password.email
                		});
	        		});
	               
	                // $state.go('tabs.list');
	            }
	    	}

	        var ref = new Firebase("https://linkspot.firebaseIO.com/");
	        ref.createUser({
	            "email": submittedForm.email,
	            "password": submittedForm.password  
	        }, authHandler)
	    }

	}]);