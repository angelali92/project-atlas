angular.module('linkSpot')
	.controller('LoginController', ['$scope', '$state', function($scope, $state) {

	    $scope.logIn = function(submittedForm) {

	    	function authHandler(error, authData) {
	            if (error) {
	                alert("Login Failed", error);
	            } else {
	                alert("Authenticated successfully with payload", authData.uid);
	                $state.go('tabs.list');
	            }
	    	}

	        var ref = new Firebase("https://linkspot.firebaseIO.com/");
	        ref.authWithPassword({
	            "email": submittedForm.email,
	            "password": submittedForm.password  
	        }, authHandler)
	    }



	}]);