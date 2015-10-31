'use strict';

/**
 * @ngdoc overview
 * @name proyecto5App
 * @description
 * # proyecto5App
 *
 * Main module of the application.
 */
angular
  .module('proyecto5App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'uiGmapgoogle-maps',
    'facebook',
    'ui.bootstrap'
  ])

  .config(function(uiGmapGoogleMapApiProvider, FacebookProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
    FacebookProvider.init('817693171681304');
  })

  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/car', {
        templateUrl: 'views/car.html',
        controller: 'CarCtrl',
        controllerAs: 'car'
      })
      .when('/car-register', {
        templateUrl: 'views/car-register.html',
        controller: 'CarRegisterCtrl',
        controllerAs: 'carregistrer'
      })
      .when('/house-register', {
        templateUrl: 'views/house-register.html',
        controller: 'HouseRegisterCtrl',
        controllerAs: 'houseregistrer'
      })
      .when('/perfil', {
        templateUrl: 'views/perfil.html',
        controller: 'PerfilCtrl',
        controllerAs: 'perfil'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function($rootScope, Facebook) {
    Facebook.getLoginStatus(function(response) {
      if(response.status === 'connected') {
        $rootScope.loggedIn = true;
        Facebook.api('/me', function(response) {
          $rootScope.user = response;
        });
      } else {
        $rootScope.loggedIn = false;
      }
    });

    $rootScope.login = function() {
      // From now on you can use the Facebook service just as Facebook api says
      Facebook.login(function(response) {
        console.log(response);
        // Do something with response.
        $rootScope.loggedIn = true;
        Facebook.api('/me', function(response) {
          $rootScope.user = response;
        });
      }, { scope: 'email,public_profile,user_birthday,user_location,user_about_me,user_photos' });
    };

    $rootScope.logout = function() {
      Facebook.logout();
      $rootScope.loggedIn = false;
    }
  });
