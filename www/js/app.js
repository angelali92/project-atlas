// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'firebase', 'ngCordova'])

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
               templateUrl: 'templates/list.html',
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
               templateUrl: 'templates/camera.html',
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
      });
      .state('qrCode', {
         url: '/qrCode',
         templateUrl: 'templates/qrcode.html',
         controller: 'qrController'
      })
      $urlRouterProvider.otherwise('/signup');
})

.factory("PeopleData", function($firebaseArray) {
  var dataRef = new Firebase("https://linkspot.firebaseIO.com/");
  return $firebaseArray(dataRef);
})

.controller('ListController', ['$scope', '$http', '$state', 'PeopleData', function($scope, $http, $state, PeopleData){

    $scope.contacts = PeopleData;
    $scope.whichContact = $state.params.cId;
    $scope.data = {
      showDelete: false,
      showReorder: false
    };

  $scope.onItemDelete = function(contact) {
   $scope.contacts.splice($scope.contacts.indexOf(contact), 1)
  };

  $scope.moveItem = function(contact, fromIndex, toIndex) {
    $scope.contacts.splice(fromIndex, 1);
    $scope.contacts.splice(toIndex, 0, contact);
  };

  $scope.toggleStar = function(contact) {
   contact.star = !contact.star;
  }

  $scope.doRefresh = function() {
      $http.get('js/data.json').success(function(data) {
         $scope.contacts = data;
         $scope.$broadcast('scroll.refreshComplete');
      });
  }


}])

.controller('BarcodeController', ['$scope', '$cordovaBarcodeScanner', '$ionicPlatform', function($scope, $cordovaBarcodeScanner, $ionicPlatform) {

  $ionicPlatform.ready(function() {
    console.log("device is ready")
    $scope.scanBarcode = function() {
      console.log("button ")
      $cordovaBarcodeScanner
      .scan()
      .then(function(imageData) {
        alert(imageData.text);
        console.log("format " + imageData.format);
      }, function(error) {
        console.log("An error happened " + error);
      });
    }
  });    

}])

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



