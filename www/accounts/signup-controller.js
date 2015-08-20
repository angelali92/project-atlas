angular.module('linkSpot')
	.controller('SignupController', ['$scope', function($scope) {

	    $scope.signUp = function(submittedForm) {

	        var ref = new Firebase("https://linkspot.firebaseIO.com/");
	        ref.createUser({
	            "email": submittedForm.email,
	            "password": submittedForm.password  
	        }, function(error, userData) {
	            if (error) {
	                alert("Error creating user", error);
	            } else {
	                alert("Successfully created user account with uid", userData.uid);
	            }
	        })
	    }

	}]);