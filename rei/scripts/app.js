'use strict';

var app = angular
  .module('ric', [
    'ngAnimate',    
    'ngResource',
    'ngRoute',    
    'firebase',
    'toaster',
    'angularMoment'
  ])
  .constant('FURL', 'https://rerereasyapp.firebaseio.com/')

  .run(function($rootScope, $location) {
    $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
      /*$rootScope.facebookAppId = '427134310815512';*/
      // We can catch the error thrown when the $requireAuth promise is rejected
      // and redirect the user back to the login page
      if (error === "AUTH_REQUIRED") {
        $location.path("/login");
      }
    });
    $rootScope.$on('$locationChangeStart', function(evt, absNewUrl, absOldUrl) {
      //console.log('start', evt, absNewUrl, absOldUrl); //debug
      // For redirecting to the previous view after succesfull login/register
      if(absOldUrl.indexOf("#") > -1) {
        var oldState = absOldUrl.split('#');
        $rootScope.redirectTo = oldState[1]; 
      }       
    });
    
  })  

  .config(function ($routeProvider) {
    $routeProvider      
      .when('/landing', {
        templateUrl: 'views/landing.html'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'AuthController'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthController'
      })
      .when('/resetPassword', {
        templateUrl: 'views/resetpassword.html',
        controller: 'AuthController'
      })
      .when('/home', {
        templateUrl: 'views/home.html'
      })
      .when('/myjobs', {
        templateUrl: 'views/myjobs.html',
        controller: 'BrowseController',
        resolve: {
          'currentAuth': ['Auth', function(Auth) {
            return Auth.requireAuth();
          }]
        }
      })
      .when('/browsejobs', {
        templateUrl: 'views/browsejobs.html',
        controller: 'BrowseController',
        resolve: {
          'currentAuth': ['Auth', function(Auth) {
            return Auth.requireAuth();
          }]
        }
      })
      .when('/job/:jobId', {
        templateUrl: 'views/job.html',
        controller: 'JobController',
        resolve: {
          'currentAuth': ['Auth', function(Auth) {
            return Auth.waitForAuth();
          }]
        }
      })
      .otherwise({
        redirectTo: '/landing'
      });
  });