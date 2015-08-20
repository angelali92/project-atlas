// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('linkSpot', ['ionic', 'firebase', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
   $stateProvider
      .state('tabs', {
         url: '/tab',
         abstract: true,
         templateUrl: 'templates/tabs.html'
      })
      .state('tabs.list', {
         url: '/list',
         views: {
            'list-tab': {
               templateUrl: 'contacts/list.html',
               controller: 'ListController'
            }
         }
      })
      .state('tabs.detail', {
         url: '/list/:cId',
         views: {
            'list-tab': {
               templateUrl: 'templates/detail.html',
               controller: 'ListController'
            }
         }
      })
      .state('tabs.camera', {
         url: '/camera',
         views: {
            'camera-tab': {
               templateUrl: 'qr-code/qr-scanner.html',
               controller: 'BarcodeController'
            }
         }
      })
      .state('signup', {
         url: '/signup',
         templateUrl: 'templates/signup.html',
         controller: 'SignupController'
      })
      .state('login', {
         url: '/login',
         templateUrl: 'templates/login.html',
         controller: 'LoginController'
      })
      .state('qrCode', {
         url: '/qrCode',
         templateUrl: 'qr-code/qrcode.html',
         controller: 'qrController'
      });
      $urlRouterProvider.otherwise('/signup');
})

.factory("PeopleData", function($firebaseArray) {
  var dataRef = new Firebase("https://linkspot.firebaseIO.com/");
  return $firebaseArray(dataRef);
})

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

}])

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

}])






