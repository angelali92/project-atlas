angular.module('linkSpot')
	.controller('LoginController', ['$scope', function($scope) {

	    $scope.logIn = function(submittedForm) {

	        var ref = new Firebase("https://linkspot.firebaseIO.com/");
	        ref.authWithPassword({
	            "email": submittedForm.email,
	            "password": submittedForm.password  
	        }, function(error, authData) {
	            if (error) {
	                alert("Login Failed", error);
	            } else {
	                alert("Authenticated successfully with payload", authData.uid);
	            }
	        })
	    }

	}]);