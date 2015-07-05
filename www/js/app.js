// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

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
      $urlRouterProvider.otherwise('/tab/list');
})

.controller('ListController', ['$scope', '$http', '$state', function($scope, $http, $state){

  $http.get('js/data.json').success(function(data) {
    $scope.contacts = data;

    $scope.whichContact = $state.params.cId;
    $scope.data = {
      showDelete: false,
      showReorder: false
    };

  });

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


}]);